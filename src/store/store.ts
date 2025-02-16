import { configureStore } from "@reduxjs/toolkit";
import { modalReducer } from "./modalSlice";
import { serviceReducer } from "./serviceSlice";
import { balanceReducer } from "./balanceSlice";
import { loadingReducer } from "./loadingSlice";
import { profileReducer } from "./profileSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    service: serviceReducer,
    balance: balanceReducer,
    loading: loadingReducer,
    profile: profileReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
