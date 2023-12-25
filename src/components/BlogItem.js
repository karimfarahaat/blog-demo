import { GoNote, GoTrash } from "react-icons/go";
import Button from "./Button";
import Panel from "./Panel";
import { useRemoveBlogMutation } from "../store";

function BlogItem({ blog }) {
  const [removeBlog, removeBlogResults] = useRemoveBlogMutation();
  const handleDelete = () => {
    removeBlog(blog);
  };
  return (
    <Panel gray className="flex flex-col gap-5 justify-between">
      <div className="flex flex-row items-center justify-between">
        <h3 className="text-2xl font-bold text-blue-500">{blog.title}</h3>
        <div className="flex flex-row items-center gap-2">
          <Button rounded secondary outline>
            <GoNote />
          </Button>
          <Button rounded danger onClick={handleDelete}>
            <GoTrash />
          </Button>
        </div>
      </div>
      <p className="text-lg">{blog.body}</p>
    </Panel>
  );
}

export default BlogItem;
