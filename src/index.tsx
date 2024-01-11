import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import Routes from "./routes";

import "./assets/styles/style.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
);
