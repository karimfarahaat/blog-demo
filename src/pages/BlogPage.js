import { Link } from "react-router-dom";
import BlogItem from "../components/BlogItem";
import Button from "../components/Button";
import Panel from "../components/Panel";
import Skeleton from "../components/Skeleton";
import { useFetchBlogsQuery } from "../store";

function BlogPage() {
  const { data, isFetching, error } = useFetchBlogsQuery();

  let content;

  if (isFetching) {
    content = <Skeleton times={3} className="h-8 w-auto" />;
  } else if (error) {
    content = (
      <div className="text-center font-bold text-2xl">
        Error Fetching Photos...😥
      </div>
    );
  } else {
    content = data?.map((blog) => {
      return <BlogItem key={blog.id} blog={blog} />;
    });
  }

  return (
    <Panel className="flex flex-col gap-5">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-4xl font-bold">My Blogs</h1>
        <Button loading={isFetching} rounded primary>
          <Link to="/form">+ Add Blog</Link>
        </Button>
      </div>
      <div className="flex flex-col gap-2">{content}</div>
    </Panel>
  );
}

export default BlogPage;
