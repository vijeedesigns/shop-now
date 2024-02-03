import { persistStore, persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";

import authReducer from "./slices/auth.ts";
import productReducer from "./slices/products.ts";
import { configureStore } from "@reduxjs/toolkit";

const persistConfig = {
    storage,
    stateReconciler: autoMergeLevel2
};

const persistedAuthReducer = persistReducer<ReturnType<typeof authReducer>>(
    { ...persistConfig, key: "auth" },
    authReducer
);

export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        products: productReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export { login } from "./slices/auth.ts";

export { getProducts } from "./slices/products.ts";
