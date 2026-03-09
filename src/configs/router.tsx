import Layout from "layouts/Layout";
import { Route, Routes } from "react-router-dom";

import List from "src/pages/orders";
import Add from "src/pages/orders/add";
import Detail from "src/pages/orders/details";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/orders" element={<List />} />
        <Route path="/orders/add" element={<Add />} />
        <Route path="/orders/:id" element={<Detail />} />
      </Route>
    </Routes>
  );
};

export default Router;
