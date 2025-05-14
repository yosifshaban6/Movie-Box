import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import { RoutesList } from "./routes/routesList";
import { Header } from "./components/Header";
import React from "react";
import { BrowserRouter } from "react-router";
import { LanguageProvider } from "./LanguageContext";

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <Header />
        <RoutesList />
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
