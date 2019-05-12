// import react. This allows us to write jsx text that
// Will seem very similar to html
import React from "react";
// import ReactDom, This allows us to render our app
// to the documents "root" id"
import ReactDOM from "react-dom";
// Import our react application that we built
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

// Render our react app to the html document at the "root" id
ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
