import { AnimatePresence, animate, motion } from "framer-motion";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import Header from "./Components/Header";

export default function App() {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route path="/tv">
            <Tv />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
