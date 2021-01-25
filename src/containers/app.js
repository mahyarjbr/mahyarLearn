import React from "react";
import Toplearn from "./toplearn";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <BrowserRouter>
      <Toplearn />
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
