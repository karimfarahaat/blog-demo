import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      className="p-8 m-20 flex flex-col items-center justify-center gap-8 border-4 border-red-600 bg-red-200"
      id="error-page"
    >
      <h1 className="text-3xl bold font-bold">Oopsyyyyy!</h1>
      <p className="text-2xl">Sorry, an unexpected error has occurred...😥</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <p className="text-xl">
        Go to <Link className="text-blue-800">HomePage</Link>.
      </p>
    </div>
  );
}
