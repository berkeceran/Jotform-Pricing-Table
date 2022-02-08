/* eslint-disable no-unused-vars */
import React from "react";
import "./AdminPopups.css";

function ColorPopUp(props) {
  return props.trigger ? (
    <div className="popup">
      <div>
        <button className="submit" onClick={() => props.setPopUp(false)}>
          Close
        </button>
        {props.children}
      </div>
      <div>
        <button
          className="submit"
          style={{ marginTop: "420px", marginLeft: "-110px" }}
          onClick={() => props.setPopUp(false)}
        >
          Set Color
        </button>
      </div>
    </div>
  ) : (
    ""
  );
}

export default ColorPopUp;
