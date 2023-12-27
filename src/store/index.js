import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { blogsApi } from "./apis/blogsApi";

export const store = configureStore({
  reducer: {
    [blogsApi.reducerPath]: blogsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(blogsApi.middleware);
  },
});

setupListeners(store.dispatch);

export {
  useFetchBlogsQuery,
  useFetchBlogQuery,
  useAddBlogMutation,
  useRemoveBlogMutation,
  useEditBlogMutation,
} from "./apis/blogsApi";
