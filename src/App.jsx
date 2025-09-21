import "./normalize.css";
import "./App.css";

import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header.jsx";
import Content from "./components/Content/Content.jsx";
import Authorization from "./components/Authorization/Authorization.jsx";
import PrivateRoute from "./router/PrivateRoute.jsx";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Content />} />
        </Route>
        <Route path="/signin" element={<Authorization action="Sign In" />} />
        <Route path="/signup" element={<Authorization action="Sign Up" />} />
        <Route
          path="*"
          element={<div style={{ textAlign: "center" }}>Page not found!</div>}
        />
      </Routes>
    </>
  );
}
