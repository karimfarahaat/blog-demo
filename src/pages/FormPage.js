import { Link, useLocation, useNavigate } from "react-router-dom";
import Panel from "../components/Panel";
import { GoArrowLeft } from "react-icons/go";
import { useAddBlogMutation, useEditBlogMutation } from "../store";
import { useState } from "react";
import Button from "../components/Button";
import { faker } from "@faker-js/faker";

function FormPage() {
  const [addBlog] = useAddBlogMutation();
  const [editBlog] = useEditBlogMutation();
  // when we want the editBlog results as they were fired in another file, we can share results instead of call mutation again using the fixedCacheKey
  // const [editBlog] = useEditBlogMutation({
  //   fixedCacheKey: "shared-edit-blog",
  // });
  // const [title, setTitle] = useState("");
  // const [body, setBody] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // the blog inside location.state that we sent with the edit button in BlogItem.js
  const blogToEdit = location.state?.blogToEdit;

  const [formData, setFormData] = useState({
    body: blogToEdit ? blogToEdit.body : "",
    title: blogToEdit ? blogToEdit.title : "",
  });

  // useEffect(() => {
  //   // Set initial values when editing
  //   if (location.state && blogToEdit) {
  //     setFormData({
  //       ...formData,
  //       body: blogToEdit.body,
  //       title: blogToEdit.title,
  //     });
  //     // setTitle(blogToEdit.title);
  //     // setBody(blogToEdit.body);
  //   }
  // }, [blogToEdit, location.state, formData.body]);

  //if blogToEdit exists, spread it and change the title and body only
  const blog = { ...blogToEdit, title: formData.title, body: formData.body };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (blogToEdit) {
      editBlog(blog);
    } else {
      addBlog(blog);
    }
    // setFormData({ body: "", title: "" });
    // if (blogToEdit) {
    //   // navigate("/", { state: { blog } });
    //   navigate("/");
    // } else {
    navigate("/");
    // }
  };

  // const handleTitleChange = (e) => {
  //   setTitle(e.target.value);
  // };
  // const handleBodyChange = (e) => {
  //   setBody(e.target.value);
  // };

  const handleDataChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleGenerateData = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      title: faker.lorem.words({ min: 1, max: 3 }),
      body: faker.lorem.words({ min: 10, max: 100 }),
    });
    // setTitle(faker.lorem.words({ min: 1, max: 3 }));
    // setBody(faker.lorem.words({ min: 10, max: 100 }));
  };
  return (
    <Panel className="flex flex-col gap-6">
      <div className="flex flex-row justify-normal items-center">
        <Link to="/">
          <GoArrowLeft />
        </Link>
        <h1 className="text-4xl font-bold mx-auto">Form Page</h1>
      </div>
      <Panel gray>
        <h2 className="text-2xl font-bold mb-2">
          {blogToEdit ? "Edit blog:" : "Create a new blog:"}
        </h2>
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col justify-center items-center gap-3 border-2 border-blue-200 bg-white rounded-3xl p-5"
        >
          <label className="text-xl text-blue-500 w-full">Blog Title</label>
          <input
            required
            minLength={4}
            maxLength={50}
            type="text"
            value={formData.title}
            name="title"
            onChange={handleDataChange}
            className="h-8 w-full border-2 rounded border-blue-200 focus:border-blue-500 outline-none"
          />
          <div className="flex flex-row w-full items-center justify-between">
            <label className="text-xl text-blue-500">Blog Body</label>
            <span>
              <i className="text-sm text-gray-400">
                {1000 - formData.body.length} characters left
              </i>
            </span>
          </div>
          <input
            minLength={20}
            maxLength={1000}
            required
            type="text"
            value={formData.body}
            name="body"
            onChange={handleDataChange}
            className="h-8 w-full border-2 rounded border-blue-200  focus:border-blue-500 outline-none"
          />
          <div className="flex flex-col w-full max-w-96 gap-2 sm:flex-row justify-between items-center">
            <Button
              primary
              rounded
              className="w-full sm:w-fit h-fit  text-center"
            >
              {blogToEdit ? "Edit Blog" : "Submit New Blog"}
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
    </Panel>
  );
}

export default FormPage;
