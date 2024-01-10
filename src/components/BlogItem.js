import { GoNote, GoTrash } from "react-icons/go";
import Button from "./Button";
import Panel from "./Panel";
import { useRemoveBlogMutation } from "../store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function BlogItem({ blog }) {
  const [removeBlog] = useRemoveBlogMutation();

  // State to control text visibility:
  const [showFullText, setShowFullText] = useState(false);

  const toggleTextVisibility = () => {
    //To depend on previous state for change use this:
    setShowFullText((prev) => !prev);
  };

  const maxCharactersToShow = 200;

  const handleDelete = () => {
    removeBlog(blog);
  };
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/form", { state: { blogToEdit: blog } });
  };

  return (
    <Panel gray className="flex flex-col gap-5 justify-between">
      <div className="flex flex-row items-center justify-between">
        <h3 className="text-2xl font-bold text-blue-500">{blog.title}</h3>
        <div className="flex flex-row items-center gap-2">
          <Button rounded secondary outline onClick={handleEdit}>
            <GoNote />
          </Button>
          <Button rounded danger onClick={handleDelete}>
            <GoTrash />
          </Button>
        </div>
      </div>
      <p className="text-lg">
        {blog.body.length > maxCharactersToShow && !showFullText
          ? `${blog.body.slice(0, maxCharactersToShow)}...`
          : blog.body}
        {blog.body.length > maxCharactersToShow && (
          <span
            className="text-blue-500 cursor-pointer"
            onClick={toggleTextVisibility}
          >
            {!showFullText ? " See more" : " See less"}
          </span>
        )}
      </p>
      <div className="text-gray-600 text-sm mt-2 flex flex-col gap-2">
        <p>Published at {blog.createdAt}</p>
        <p>{blog.updatedAt && <span>Updated at {blog.updatedAt}</span>}</p>
      </div>
    </Panel>
  );
}

export default BlogItem;
