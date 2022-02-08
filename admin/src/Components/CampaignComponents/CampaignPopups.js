/* eslint-disable no-unused-vars */
import React from "react";

function CampaignPopups(props) {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <div className="popup-container">
          <div className="popup-title">Add Plan</div>
          <button
            className="close-btn"
            onClick={() => props.setPopUp(false)}
          ></button>
          <div className="popup-content">{props.children}</div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default CampaignPopups;
