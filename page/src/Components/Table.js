/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import TablePopUp from "./TablePopUp";
import "./Table.css";
import SubscribeButton from "./SubscribeButton/SubscribeButton";

function Table(props) {
  const [popUp, setPopUp] = useState(false);
  const [sendItem, setSendItem] = useState({});
  const handleViewMore = (e) => {
    setPopUp(true);
    setSendItem(e);
  };
  const style = {};

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  return (
    <div>
      <div
        className="row"
        style={{
          justifyContent: "center",
        }}
      >
        {props.dataArr &&
          props.dataArr.map((item) => {
            return (
              <div style={style} key={item.id} className="pricing-table">
                <div className="pricing-table-header">
                  <h3>
                    <strong>{item.pricing_name}</strong>
                  </h3>
                  <p>{item.pricing_name} Package</p>
                </div>
                <div className="price-top">
                  <strong>${item.descriptions}</strong>
                </div>
                <div
                  className="price"
                  style={{ backgroundColor: `${item.color}` }}
                >
                  {item.campaign !== null ? (
                    <>
                      <div className="campaign-asset">
                        {item.campaign.campaign_name.charAt(0).toUpperCase() +
                          item.campaign.campaign_name.slice(1)}{" "}
                        Discount!
                      </div>
                      <strike>${item.price}</strike>{" "}
                      <strong>${item.current_price}</strong> / {item.period}
                    </>
                  ) : (
                    <>
                      <br></br>
                      <strong>${item.price}</strong> / {item.period}
                    </>
                  )}
                </div>
                <div className="pricing-body">
                  <ul className="pricing-table-ul">
                    <li>Description: {item.descriptions}</li>
                    <li>Show Branding: {item.branding}</li>
                    <li>Money back chance within 7 days</li>
                    <li>24X7 Support</li>
                    <li>Verified Customer Satisfaction</li>
                  </ul>

                  <button
                    className="view-more"
                    onClick={() => handleViewMore(item)}
                  >
                    View More
                  </button>

                  <SubscribeButton formID={item.form_id} />
                </div>
              </div>
            );
          })}
      </div>
      <TablePopUp
        trigger={popUp}
        setPopUp={setPopUp}
        item={sendItem}
      ></TablePopUp>
    </div>
  );
}

export default Table;
