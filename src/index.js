import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app/app";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store, { persistor } from "./servises/store";
import { PersistGate } from "redux-persist/integration/react";
const root = ReactDOM.createRoot(document.getElementById("root"));

function update() {
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
}

store.subscribe(update);

update();
