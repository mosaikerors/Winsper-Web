import React from "react";
import ReactDOM from "react-dom";
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import { BrowserRouter as Router, Route} from "react-router-dom";
const rootElement = document.getElementById("root");
ReactDOM.render(
    <Router>
        <Route exact path="/" component={LoginPage} />
        <Route path="/admin" component={AdminPage} />
    </Router>, rootElement
);