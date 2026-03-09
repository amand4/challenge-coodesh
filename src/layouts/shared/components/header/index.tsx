import { AppBar } from "@mui/material";
import logo from "src/assets/images/flowa-logo.svg";

const Header = () => {
  return (
    <AppBar
      position="sticky"
      sx={{
        width: "100%",
        backgroundColor: "#22372b",
        height: "60px",
        gap: "0px",
        opacity: "0.8",
        boxShadow: "0px 1px 3px 0px #c2e189",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img src={logo} alt="Logo Base Flowa" />
    </AppBar>
  );
};

export default Header;
