import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const blogsApi = createApi({
  reducerPath: "blogs",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3004",
  }),
  endpoints(builder) {
    return {
      fetchBlogs: builder.query({
        // providesTags: (result, error, arg) => {
        //   const tags = result.map((blog) => {
        //     return { type: "Blog", id: blog.id };
        //   });
        //   tags.push({ type: "AllBlogs" });
        //   return tags;
        // },
        // we could have used only this below, but we had to then invalidate "ALlBlogs"
        // along with the "Blog" tagin the editBlog for example to refetch automatically
        providesTags: [{ type: "AllBlogs" }],
        query: () => {
          return {
            url: "/blogs",
            method: "GET",
          };
        },
      }),
      // Fetch single blog by ID query
      fetchBlog: builder.query({
        query: (blog) => {
          return {
            url: `/blogs/${blog.id}`,
            method: "GET",
          };
        },
        providesTags: (result, error, blog) => [{ type: "Blog", id: blog.id }],
      }),
      addBlog: builder.mutation({
        invalidatesTags: (result, error, blogs) => {
          return [{ type: "AllBlogs" }];
        },
        query: (blog) => {
          const formattedDate = new Date().toLocaleDateString("en-GB"); // Format: dd-mm-yyyy

          return {
            url: "/blogs",
            method: "POST",
            body: {
              title: blog.title,
              body: blog.body,
              createdAt: formattedDate,
            },
          };
        },
      }),
      removeBlog: builder.mutation({
        invalidatesTags: (result, error, blog) => {
          return [{ type: "AllBlogs" }];
        },
        query: (blog) => {
          return {
            url: `/blogs/${blog.id}`,
            method: "DELETE",
          };
        },
      }),
      editBlog: builder.mutation({
        invalidatesTags: (result, error, blog) => {
          // return [{ type: "Blog", id: blog.id }];
          // completes the commented providedTags for fetchBlogs to be effective
          return [{ type: "Blog", id: blog.id }, { type: "AllBlogs" }];
        },
        query: (blog) => {
          const formattedDate = new Date().toLocaleDateString("en-GB");
          return {
            url: `/blogs/${blog.id}`,
            method: "PUT",
            body: { ...blog, updatedAt: formattedDate },
          };
        },
      }),
    };
  },
});

export const {
  useFetchBlogsQuery,
  useFetchBlogQuery,
  useAddBlogMutation,
  useRemoveBlogMutation,
  useEditBlogMutation,
} = blogsApi;

export { blogsApi };
