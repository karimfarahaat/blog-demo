import { Link, useNavigate } from "react-router-dom";
import Panel from "../components/Panel";
import { GoArrowLeft } from "react-icons/go";
import { useAddBlogMutation } from "../store";
import { useState } from "react";
import Button from "../components/Button";
import { faker } from "@faker-js/faker";

function FormPage() {
  const [addBlog, addBlogResults] = useAddBlogMutation();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  const blog = { title, body };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    addBlog(blog);
    setTitle("");
    setBody("");
    navigate("/");
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };
  const handleGenerateData = (e) => {
    e.preventDefault();
    setTitle(faker.lorem.words({ min: 1, max: 3 }));
    setBody(faker.lorem.words({ min: 10, max: 100 }));
  };
  return (
    <Panel className="flex flex-col gap-6">
      <div className="flex flex-row justify-normal items-center">
        <Link to="/">
          <GoArrowLeft />
        </Link>
        <h1 className="text-4xl font-bold mx-auto">Form Page</h1>
      </div>
      <h2 className="text-2xl font-bold">Create a new blog:</h2>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col justify-center items-center gap-3 border-2 border-gray-200 rounded-3xl p-5"
      >
        <label className="text-xl text-blue-500 w-full">Blog Title</label>
        <input
          required
          minLength={4}
          maxLength={50}
          type="text"
          value={title}
          onChange={handleTitleChange}
          className="h-8 w-full border-2 rounded border-blue-200 focus:border-blue-500 outline-none"
        />
        <div className="flex flex-row w-full items-center justify-between">
          <label className="text-xl text-blue-500">Blog Body</label>
          <span>
            <i className="text-sm text-gray-400">
              {1000 - body.length} characters left
            </i>
          </span>
        </div>
        <input
          minLength={20}
          maxLength={1000}
          required
          type="text"
          value={body}
          onChange={handleBodyChange}
          className="h-8 w-full border-2 rounded border-blue-200  focus:border-blue-500 outline-none"
        />
        <div className="flex flex-col w-full max-w-96 gap-2 sm:flex-row justify-between items-center">
          <Button
            primary
            rounded
            className="w-full sm:w-fit h-fit  text-center"
          >
            Submit New Blog
          </Button>
          <Button
            primary
            rounded
            className="w-full sm:w-fit h-fit text-center"
            onClick={handleGenerateData}
          >
            Generate Random Data
          </Button>
        </div>
      </form>
    </Panel>
  );
}

export default FormPage;
