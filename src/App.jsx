import { useState } from "react";
import "./normalize.css";
import "./App.css";

import Header from "./components/Header/Header.jsx";
import Filter from "./components/Filter/Filter.jsx";
import List from "./components/List/List.jsx";

export default function App() {
  return (
    <>
      <Header />
      <Filter />
      <List />
    </>
  );
}
