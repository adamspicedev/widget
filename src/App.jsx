import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Widget } from "./components/Widget";

function App() {
  return (
    <>
      <Widget projectId="1" position="top-center" />
    </>
  );
}

export default App;
