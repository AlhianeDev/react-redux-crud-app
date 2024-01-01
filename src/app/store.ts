import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./UserSlice";

const store = configureStore({

    reducer: {

        user: userReducer

    }

});

export default store;

export type StateType = ReturnType<typeof store.getState>

export type dispatchType = typeof store.dispatch;
