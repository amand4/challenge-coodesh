import Typography from "@mui/material/Typography";

interface TextCellProps {
  value: string;
}

const TextCell = (props: TextCellProps) => {
  return (
    <Typography variant="body2" sx={{ color: "text.primary" }}>
      {props.value}
    </Typography>
  );
};

export default TextCell;
