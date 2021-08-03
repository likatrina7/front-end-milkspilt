import "./App.css";
import React, { useState } from "react";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import About from "./pages/About.js";
import ContactUs from "./pages/ContactUs.js";
import Home from "./pages/Home.js";
import NotFound from "./pages/NotFound.js";
import AskQuestion from "./pages/AskQuestion.js";
import Question from "./pages/Question.js";
import Dashboard from "./pages/Dashboard.js";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

function App() {
  const [questionId, setQuestionId] = useState(0);

  return (
    <BrowserRouter>
      <div>
        <Header></Header>
      </div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={ContactUs} />
        <Route exact path="/askQuestion" component={AskQuestion} />
        <Route exact path="/askQuestion/:id" component={Question} />
        <Route exact path="/dashboard">
          {/* {login ? <Dashboard /> : <Redirect to="/" />} */}
        </Route>
        <Route component={NotFound} />
      </Switch>
      <div>
        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
