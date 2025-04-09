import { configureStore } from "@reduxjs/toolkit";
import adminProductReducer from "./admin/productSlice";
import authReducer from "./auth-slice/index";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductReducer,
  },
});

export default store;
