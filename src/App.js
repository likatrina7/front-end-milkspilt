import "./App.css";
import React, { useState } from "react";
import Header from "./components/header.js";
import Footer from "./components/footer.js";
import About from "./pages/about.js";
import ContactUs from "./pages/contactUs.js";
import Home from "./pages/home.js";
import NotFound from "./pages/notFound.js";
import AskQuestion from "./pages/askQuestion.js";
import Dashboard from "./pages/dashboard.js";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

function App() {
  const [login, setLogin] = useState(false);

  const handleLogin = () => {
    setLogin(!login);
  };

  return (
    <BrowserRouter>
      <div>
        <Header login={login} handleLogin={handleLogin}></Header>
      </div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={ContactUs} />
        <Route exact path="/askQuestion" component={AskQuestion} />
        <Route exact path="/dashboard">
          {login ? <Dashboard /> : <Redirect to="/" />}
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
