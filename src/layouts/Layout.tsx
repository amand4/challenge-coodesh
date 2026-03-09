import { Outlet } from "react-router-dom";
import StandardLayout from "./StandardLayout";

const Layout = () => {
  return (
    <StandardLayout>
      <Outlet />
    </StandardLayout>
  );
};

export default Layout;
