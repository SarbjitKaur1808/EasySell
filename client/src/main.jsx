import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.hydrate(<App />, document.getElementById("root"));

// import React from "react";
// import { hydrateRoot } from "react-dom/client";
// import App from "./App";

// const container = document.getElementById("root");
// const root = hydrateRoot(container, <App />);
