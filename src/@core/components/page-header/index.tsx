import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

import type { PageHeaderProps } from "./types";

const StyledPageHeaderBox = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "start",
});

const PageHeader = (props: PageHeaderProps) => {
  const { title, subtitle } = props;

  return (
    <StyledPageHeaderBox>
      <Box sx={{ mb: 4 }}>
        {title}
        {subtitle || null}
      </Box>
    </StyledPageHeaderBox>
  );
};

export default PageHeader;
