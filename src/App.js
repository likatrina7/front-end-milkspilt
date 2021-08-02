import './App.css';
import React from 'react';
import Header from './components/header.js';
import Footer from './components/footer.js';
import About from './pages/about.js';
import ContactUs from './pages/contactUs.js';
import Home from './pages/home.js';
import NotFound from './pages/notFound.js';
import AskQuestion from './pages/askQuestion.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
      <BrowserRouter>
        <div>
          <Header></Header>
        </div>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/about" component={About}/>
          <Route exact path="/contact" component={ContactUs}/>
          <Route exact path="/askQuestion" component={AskQuestion}/>
          <Route component={NotFound}/>
        </Switch>
        <div>
          <Footer></Footer>
        </div>
      </BrowserRouter>
    );
}

export default App;
