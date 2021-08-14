import "./App.css";
import React, { useState } from "react";
import Footer from "./components/Footer.js";
import About from "./pages/About.js";
import ContactUs from "./pages/ContactUs.js";
import Home from "./pages/Home.js";
import NotFound from "./pages/NotFound.js";
import AskQuestion from "./pages/AskQuestion.js";
import Question from "./pages/Question.js";
import Dashboard from "./pages/Dashboard.js";
import Search from "./pages/Search.js";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { UserProvider } from "./UserContext";
import { DarkModeProvider } from "./DarkModeContext";

function App() {
  return (
    <UserProvider>
      <DarkModeProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/contact" component={ContactUs} />
            <Route exact path="/questions" component={AskQuestion} />
            <Route exact path="/questions/:id" component={Question} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/search/:keyword" component={Search} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </BrowserRouter>
      </DarkModeProvider>
    </UserProvider>
  );
}

export default App;
