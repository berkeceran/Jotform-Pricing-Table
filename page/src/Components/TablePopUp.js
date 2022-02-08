/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./Table.css";

function TablePopUp(props) {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <div
          key={props.item.id}
          className={`pricing-table ${
            props.item.id % 3 === 0
              ? "zero"
              : props.item.id % 3 === 1
              ? "one"
              : "two"
          }`}
        >
          <div className="pricing-table-header">
            <h3>
              <strong>{props.item.pricing_name}</strong>
            </h3>
            <p>{props.item.pricing_name} Package</p>
          </div>
          <div
            className="price"
            style={{ backgroundColor: `${props.item.color}` }}
          >
            <strong>${props.item.current_price}</strong> / {props.item.period}
          </div>
          <div className="pricing-body">
            <ul className="pricing-table-ul">
              <li>Description: {props.item.descriptions}</li>
              <li>Show Branding: {props.item.branding}</li>
              <li>Unlimited MySQL Database</li>
              <li className="not-avail">24X7 Support</li>
              <li className="not-avail">Email Support</li>

              {props.item.extra &&
                props.item.extra.map((item) => {
                  return (
                    <div key={item.id}>
                      <li style={{ color: "blue" }}>
                        {item.feature_name}: <strong> {item.value}</strong>
                      </li>
                    </div>
                  );
                })}
            </ul>
          </div>
          <button className="close-btn" onClick={() => props.setPopUp(false)}>
            Close
          </button>
        </div>

        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}
export default TablePopUp;
