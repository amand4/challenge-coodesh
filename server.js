import jsonServer from "json-server";
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

const db = router.db;

const now = () => new Date().toISOString();

function generateId() {
  return crypto.randomUUID();
}

function addHistory(orderId, fromStatus, toStatus) {
  db.get("orderHistory")
    .push({
      id: generateId(),
      orderId,
      fromStatus,
      toStatus,
      timestamp: now(),
    })
    .write();
}

server.get("/orders", (req, res) => {
  const db = router.db;
  let orders = db.get("orders").value();

  Object.keys(req.query).forEach((key) => {
    if (!["page", "limit", "sort", "order"].includes(key)) {
      orders = orders.filter((item) =>
        String(item[key]).includes(req.query[key]),
      );
    }
  });

  const sortField = req.query.sort;
  const sortOrder = req.query.order || "asc";

  if (sortField) {
    orders = orders.sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }

  const total = orders?.length;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const start = (page - 1) * limit;
  const end = page * limit;

  const items = orders.slice(start, end);

  res.json({
    items,
    total,
  });
});

server.post("/orders", (req, res) => {
  const order = req.body;

  const newOrder = {
    id: generateId(),
    instrument: order.instrument,
    side: order.side,
    price: Number(order.price),
    quantity: Number(order.quantity),
    remainingQuantity: Number(order.quantity),
    status: "OPEN",
    createdAt: now(),
  };

  matchOrders(newOrder);

  db.get("orders").push(newOrder).write();

  addHistory(newOrder.id, null, "OPEN");

  res.status(201).json(newOrder);
});

function matchOrders(order) {
  const oppositeSide = order.side === "BUY" ? "SELL" : "BUY";

  let matches = db
    .get("orders")
    .filter({
      instrument: order.instrument,
      side: oppositeSide,
    })
    .filter((o) => ["OPEN", "PARTIAL"].includes(o.status))
    .value();

  matches = matches.sort((a, b) => {
    if (order.side === "BUY") {
      if (a.price !== b.price) return a.price - b.price;
    } else {
      if (a.price !== b.price) return b.price - a.price;
    }

    return new Date(a.createdAt) - new Date(b.createdAt);
  });

  for (const match of matches) {
    if (order.remainingQuantity <= 0) break;

    const priceCompatible =
      order.side === "BUY"
        ? order.price >= match.price
        : order.price <= match.price;

    if (!priceCompatible) continue;

    const executedQty = Math.min(
      order.remainingQuantity,
      match.remainingQuantity,
    );

    order.remainingQuantity -= executedQty;
    match.remainingQuantity -= executedQty;

    const tradePrice = match.price;

    db.get("trades")
      .push({
        id: generateId(),
        buyOrderId: order.side === "BUY" ? order.id : match.id,
        sellOrderId: order.side === "SELL" ? order.id : match.id,
        quantity: executedQty,
        price: tradePrice,
        timestamp: now(),
      })
      .write();

    const oldStatus = match.status;

    if (match.remainingQuantity === 0) {
      match.status = "EXECUTED";
    } else {
      match.status = "PARTIAL";
    }

    db.get("orders").find({ id: match.id }).assign(match).write();

    if (oldStatus !== match.status) {
      addHistory(match.id, oldStatus, match.status);
    }
  }

  const oldStatus = order.status;

  if (order.remainingQuantity === 0) {
    order.status = "EXECUTED";
  } else if (order.remainingQuantity < order.quantity) {
    order.status = "PARTIAL";
  }

  if (oldStatus !== order.status) {
    addHistory(order.id, oldStatus, order.status);
  }
}

server.patch("/orders/:id/cancel", (req, res) => {
  const id = req.params.id;

  const order = db.get("orders").find({ id }).value();

  if (!order) {
    return res.status(404).json({ message: "Ordem não encontrada" });
  }

  if (!["OPEN", "PARTIAL"].includes(order.status)) {
    return res.status(400).json({
      message: "Somente ordens abertas ou parciais podem ser canceladas",
    });
  }

  const oldStatus = order.status;

  order.status = "CANCELLED";

  db.get("orders").find({ id }).assign(order).write();

  addHistory(id, oldStatus, "CANCELLED");

  res.json(order);
});

server.get("/orders/:id/history", (req, res) => {
  const db = router.db;
  const { id } = req.params;

  const history = db.get("orderHistory").filter({ orderId: id }).value();

  res.json(history);
});

server.use(router);

server.listen(3001, () => {
  console.log("JSON Server running on http://localhost:3001");
});
