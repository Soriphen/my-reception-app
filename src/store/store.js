import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import authReducer from "./features/auth/authSlice";
import studiosReducer from "./features/studios/studiosSlice";
import storage from "redux-persist/lib/storage";
import { persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  studios: studiosReducer,
});

const makeConfiguredStore = () => configureStore({ reducer: rootReducer });

export const makeStore = () => {
  const isServer = typeof window === "undefined";

  if (isServer) {
    // Server side
    return makeConfiguredStore();
  } else {
    // Client side
    const persistedReducer = persistReducer(persistConfig, rootReducer);

    const store = configureStore({
      reducer: persistedReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
    });

    store.__persistor = persistStore(store);

    return store;
  }
};
