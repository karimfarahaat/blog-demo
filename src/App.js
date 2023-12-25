import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";

function App() {
  return (
    <div className="container mx-auto my-10">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
