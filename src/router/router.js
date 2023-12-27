import {
  //instead of BrowserRouter and Routes
  createBrowserRouter,

  //Route component of react and not Routes (but instead i used the new way, children as down below)
  // Route,
} from "react-router-dom";
import BlogPage from "../pages/BlogPage";
import FormPage from "../pages/FormPage";
import ErrorPage from "../pages/ErrorPage";
import Layout from "../pages/Layout";

export const router = createBrowserRouter([
  // to type it in the <Route path="" element={}></Route> syntax, use the following function
  // createRoutesFromElements([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        // path: "blogs",
        element: <BlogPage />,
      },
      {
        path: "form",
        element: <FormPage />,
      },
      // {
      //   path: "add",
      //   element: <FormPage />,
      // },
      // {
      //   path: "edit",
      //   element: <FormPage />,
      // },
    ],
  },
  // ])
]);
