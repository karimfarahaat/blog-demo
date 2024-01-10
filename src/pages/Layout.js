import { Outlet } from "react-router-dom";

function Layout() {
  return (
    // this empty fragment could have been a layout for the App,
    // where we render the pages in any specific tag for example
    <>
      {/* Where to render our elements in router, is the Outlet */}
      <Outlet />
    </>
  );
}

export default Layout;
