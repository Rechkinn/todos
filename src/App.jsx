import { useState } from "react";
import "./normalize.css";
import "./App.css";

import Header from "./components/Header/Header.jsx";
// import Filter from "./components/Filter/Filter.jsx";
// import List from "./components/List/List.jsx";
import Content from "./components/Content/Content.jsx";

export default function App() {
  return (
    <>
      <Header />
      <Content />
      {/* <List /> */}
    </>
  );
}
