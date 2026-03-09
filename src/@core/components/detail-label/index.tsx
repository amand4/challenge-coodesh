import Typography from "@mui/material/Typography";

import { DetailLabelProps } from "./types";

const DetailLabel = (props: DetailLabelProps) => {
  const { text } = props;

  return (
    <Typography
      variant="subtitle2"
      sx={{ mr: 2, mt: -0.3, color: "text.primary" }}
    >
      {text}:
    </Typography>
  );
};

export default DetailLabel;
