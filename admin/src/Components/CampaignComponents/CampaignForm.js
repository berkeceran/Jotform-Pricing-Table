/* eslint-disable no-unused-vars */

import React, { useState, useEffect, useRef } from "react";
//import "./Admin.scss";
import Select from "react-select";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function CampaignForm(props) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [allInputs, setInputs] = useState({
    name: "",
    discount: "",
    type: "",
    descriptions: "",
    pricing_id: "",
  });

  const periodOptions = [
    {
      value: "percentage",
      label: "percentage",
    },
    {
      value: "direct",
      label: "direct",
    },
  ];
  const periodOptions2 = [];

  function customTheme(theme) {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary25: "orange",
        primary: "green",
      },
    };
  }

  const handleChange = (e) => {
    setInputs((prevValues) => {
      return {
        ...prevValues,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handlePeriod = (e) => {
    setInputs((prevValues) => {
      return {
        ...prevValues,
        type: e.value,
      };
    });
  };

  const handlePlan = (e) => {
    setInputs((prevValues) => {
      return {
        ...prevValues,
        pricing_id: e.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (allInputs.name.trim() === "") {
      return alert(" Name Field should not be empty");
    }
    if (!Number(allInputs.discount)) {
      return alert("Price Field should not be empty");
    }
    if (allInputs.type.trim() === "") {
      return alert("Period Field should not be empty");
    }

    if (allInputs.descriptions.trim() === "") {
      return alert("Description Field should not be empty");
    }
    if (allInputs.pricing_id === "") allInputs.pricing_id = -1;
    const sendData = {
      campaign_name: allInputs.name,
      discount: allInputs.discount,
      type: allInputs.type,
      descriptions: allInputs.descriptions,
      start_date: `${startDate.getFullYear()}-${
        startDate.getMonth() + 1
      }-${startDate.getDate()}`,
      end_date: `${endDate.getFullYear()}-${
        endDate.getMonth() + 1
      }-${endDate.getDate()}`,

      pricing_id: allInputs.pricing_id,
    };

    props.insertData(sendData);

    setInputs({
      // removing input field characters when add button clicked
      name: "",
      discount: "",
      type: "",
      descriptions: "",
      pricing_id: "",
    });
  };

  return (
    <div className="admin-page">
      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="line">
          <label htmlFor="subsName">What is your campaign name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={allInputs.name}
            className="admin-pricename-input"
            onChange={handleChange}
          />
        </div>
        <div className="line">
          <label htmlFor="subsPrice">What is your campaign discount</label>
          <input
            type="number"
            placeholder=""
            id="discount"
            name="discount"
            value={allInputs.discount}
            className="admin-price-input"
            onChange={handleChange}
          />
        </div>
        <div className="line">
          <label htmlFor="subsPeriod">Campaign Type</label>
          <Select
            theme={customTheme}
            name="type"
            options={periodOptions}
            className=" admin-subs-period"
            placeholder=""
            isSearchable
            onChange={handlePeriod}
          />
        </div>
        <div className="line">
          <label htmlFor="subsPrice">What is your campaign start date</label>

          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>
        <div className="line">
          <label htmlFor="subsPrice">What is your campaign end date</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
          />
        </div>
        <div className="line">
          <label htmlFor="description">Description of campaign</label>
          <textarea
            type="text"
            id="descriptions"
            name="descriptions"
            value={allInputs.descriptions}
            className="admin-description"
            onChange={handleChange}
          />
        </div>
        <div className="line">
          <label htmlFor="subsPeriod">Plan Name</label>
          <Select
            theme={customTheme}
            name="pricing_name"
            options={props.plans.map((plan) => {
              return {
                value: plan.id,
                label: plan.pricing_name,
              };
            })}
            className=" admin-subs-period"
            placeholder=""
            isSearchable
            onChange={handlePlan}
          />
        </div>

        <div className="buttons">
          <button className="submit">Add</button>
        </div>
      </form>
    </div>
  );
}

export default CampaignForm;
