import Chip from "@mui/material/Chip";
import { SxProps } from "@mui/material";

import { ThemeColor } from "layouts/types";

interface ChipCellProps {
  color: ThemeColor;
  label: string;
  sx?: SxProps;
}

const ChipCell = (props: ChipCellProps) => {
  return (
    <Chip
      size="small"
      color={props.color}
      label={props.label}
      sx={{ "& .MuiChip-label": { textTransform: "capitalize" }, ...props.sx }}
    />
  );
};

export default ChipCell;
