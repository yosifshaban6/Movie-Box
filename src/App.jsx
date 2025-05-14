import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import { RoutesList } from "./routes/routesList";
import { Header } from "./components/Header";
import React from "react";
import { BrowserRouter } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <RoutesList></RoutesList>
    </BrowserRouter>
  );
}

export default App;
