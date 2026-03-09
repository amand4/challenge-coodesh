import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import DetailLabel from "../detail-label";

import { TableRowAvoidedProps } from "./types";

import { NumericFormat } from "react-number-format";

const TableRowAvoided = (props: TableRowAvoidedProps) => {
  const { label, value, currency, formatter } = props;

  const displayValue = formatter && value ? formatter(value) : value;

  if (!value || value.length === 0) {
    return null;
  }

  return (
    <TableRow>
      <TableCell>
        <DetailLabel text={label} />
      </TableCell>

      <TableCell>
        <Typography variant="body2">
          {currency ? (
            <NumericFormat
              value={parseInt(value)}
              displayType="text"
              decimalScale={2}
              fixedDecimalScale
              thousandSeparator="."
              decimalSeparator=","
              prefix="R$ "
            />
          ) : (
            displayValue
          )}
        </Typography>
      </TableCell>
    </TableRow>
  );
};

export default TableRowAvoided;
