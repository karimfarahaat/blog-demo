import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const blogsApi = createApi({
  reducerPath: "blogs",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3004",
  }),
  endpoints(builder) {
    return {
      fetchBlogs: builder.query({
        providesTags: (result, error, arg) => {
          const tags = result.map((blog) => {
            return { type: "Blog", id: blog.id };
          });
          tags.push({ type: "AllBlogs" });
          return tags;
        },
        query: () => {
          return {
            url: "/blogs",
            method: "GET",
          };
        },
      }),
      addBlog: builder.mutation({
        invalidatesTags: (result, error, blogs) => {
          return [{ type: "AllBlogs" }];
        },
        query: (blog) => {
          return {
            url: "/blogs",
            method: "POST",
            body: {
              title: blog.title,
              body: blog.body,
            },
          };
        },
      }),
      removeBlog: builder.mutation({
        invalidatesTags: (result, error, blog) => {
          return [{ type: "Blog", id: blog.id }];
        },
        query: (blog) => {
          return {
            url: `/blogs/${blog.id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

export const { useFetchBlogsQuery, useAddBlogMutation, useRemoveBlogMutation } =
  blogsApi;

export { blogsApi };
