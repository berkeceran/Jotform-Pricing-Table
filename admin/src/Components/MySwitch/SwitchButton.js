/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import { useHistory, useLocation } from "react-router-dom";
import Switch from "react-switch";

function SwitchButton() {
  let history = useHistory();
  let location = useLocation();

  const planHandler = (e) => {
    //e.target.style.backgroundColor = "red";
    history.push("/intern/jr-revenue/admin/table");
  };

  const campaignHandler = (e) => {
    //e.target.style.backgroundColor = "black";
    history.push("/intern/jr-revenue/admin/campaign");
  };

  return (
    <div className="buttons" style={{ marginRight: "40%", marginBottom: "2%" }}>
      <button className="plan-btn" onClick={planHandler}>
        Plan
      </button>
      <button className="campaign-btn" onClick={campaignHandler}>
        Campaign
      </button>
    </div>
  );
}

export default SwitchButton;
