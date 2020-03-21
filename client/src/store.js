import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import reducers from "./reducers";

let store;

// Enable redux dev tool only in development mode
if (process.env.NODE_ENV === "development") {
  const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;
  store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
} else {
  store = createStore(reducers, applyMiddleware(thunk));
}

export default store;
