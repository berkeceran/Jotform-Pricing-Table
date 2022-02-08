/* eslint-disable no-unused-vars */
import React from "react";
import {
  BrowserRouter,
  BrowserRouter as Router,
  Link,
  Route,
  Redirect,
} from "react-router-dom";

import "typeface-roboto";
import "./App.scss";

import AdminTable from "./Components/TableComponents/AdminTable";
import Login from "./Components/LoginOutComponents/Login";
import Campaign from "./Components/CampaignComponents/Campaign";

const App = () => {
  return (
    <>
      <div className="header">
        <div className="container">
          <span id="common-header-span">Plan Builder</span>
        </div>
      </div>

      <div className="container">
        <Router>
          <div className="app">
            {localStorage.getItem("logedIn") === "true" ? (
              <Redirect to="/intern/jr-revenue/admin/table" />
            ) : (
              <Redirect to="/intern/jr-revenue/admin/login" />
            )}
            <Route path="/intern/jr-revenue/admin/login" component={Login} />
            <Route
              path="/intern/jr-revenue/admin/table"
              component={AdminTable}
            />
            <Route
              path="/intern/jr-revenue/admin/campaign"
              component={Campaign}
            />
          </div>
        </Router>
      </div>
    </>
  );
};

export default App;
