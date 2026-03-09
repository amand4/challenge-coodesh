/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactNode } from "react";

import { styled } from "@mui/material/styles";
import Box, { BoxProps } from "@mui/material/Box";

import Header from "./shared/components/header";

import { Outlet } from "react-router-dom";

const StandardLayoutWrapper = styled("div")({
  height: "100%",
  display: "flex",
});

const MainContentWrapper = styled(Box)<BoxProps>({
  flexGrow: 1,
  minWidth: 0,
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
});

const ContentWrapper = styled("main")(() => ({
  flexGrow: 1,
  width: "100%",
  transition: "padding .25s ease-in-out",
}));

const StandardLayout = (props: { children: ReactNode }) => {
  return (
    <StandardLayoutWrapper>
      <MainContentWrapper>
        <Header />
        <ContentWrapper
          className="layout-page-content"
          sx={{
            mx: "auto",
            "@media (min-width:1440px)": { maxWidth: 1440 },
            "@media (min-width:1200px)": { maxWidth: "100%" },
          }}
        >
          <Outlet />
        </ContentWrapper>
      </MainContentWrapper>
    </StandardLayoutWrapper>
  );
};

export default StandardLayout;
