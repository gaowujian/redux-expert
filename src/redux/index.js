import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import { routerMiddleware } from "connected-react-router";
import history from "./history";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  applyMiddleware(routerMiddleware(history))
);

let persistor = persistStore(store);

export { store, persistor };
