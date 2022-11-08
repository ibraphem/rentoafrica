import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import storeInit from "./redux/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";


ReactDOM.render(
  <React.Fragment>
    <Suspense fallback={<div />}>
    <Provider  store={storeInit.store}>
    <PersistGate loading={null} persistor={storeInit.persistor}>
     <App/>
     </PersistGate>
      </Provider>
    </Suspense>
  </React.Fragment>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
