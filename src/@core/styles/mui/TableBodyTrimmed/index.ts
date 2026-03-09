import { styled } from "@mui/material/styles";
import TableBody, { TableBodyProps } from "@mui/material/TableBody";

const TableBodyTrimmed = styled(TableBody)<TableBodyProps>(() => ({
  "& .MuiTableCell-root": {
    border: 0,
    paddingTop: "2",
    paddingBottom: "2",
    paddingLeft: "0 !important",
    paddingRight: "0 !important",
    "&:first-of-type": {
      width: "35%",
    },
  },
}));

export default TableBodyTrimmed;
