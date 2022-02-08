/* eslint-disable no-unused-vars */

import React, { useState, useEffect, useRef } from "react";
import "./Admin.scss";
import Select from "react-select";

function AdminForm(props) {
  const [allInputs, setInputs] = useState({
    subsName: "",
    subsPrice: "",
    subsPeriod: "",
    branding: false,
    description: "",
  });

  const periodOptions = [
    {
      value: "Month",
      label: "Month",
    },
    {
      value: "Year",
      label: "Year",
    },
  ];

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
        [e.target.name]:
          e.target.name === "branding" ? e.target.checked : e.target.value,
      };
    });
  };

  const handlePeriod = (e) => {
    setInputs((prevValues) => {
      return {
        ...prevValues,
        subsPeriod: e.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (allInputs.subsName.trim() === "") {
      return alert(" Name Field should not be empty");
    } else if (!Number(allInputs.subsPrice)) {
      return alert("Price Field should not be empty");
    }
    if (allInputs.subsPeriod.trim() === "") {
      return alert("Period Field should not be empty");
    }

    if (allInputs.description.trim() === "") {
      return alert("Description Field should not be empty");
    }
    const sendData = {
      pricing_name: allInputs.subsName,
      price: allInputs.subsPrice,
      period: allInputs.subsPeriod,
      descriptions: allInputs.description,
      branding: allInputs.branding ? "yes" : "no",
    };
    props.insertData(sendData);

    setInputs({
      // removing input field characters when add button clicked
      subsName: "",
      subsPrice: "",
      subsPeriod: "",
      branding: false,
      description: "",
    });
  };

  return (
    <div className="admin-page">
      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="line">
          <label htmlFor="subsName">What is your plan name</label>
          <input
            type="text"
            id="subsName"
            name="subsName"
            value={allInputs.subsName}
            className="admin-pricename-input"
            onChange={handleChange}
          />
        </div>
        <div className="line">
          <label htmlFor="subsPrice">What is your plan price</label>
          <input
            type="number"
            placeholder=""
            id="subsPrice"
            name="subsPrice"
            value={allInputs.subsPrice}
            className="admin-price-input"
            onChange={handleChange}
          />
        </div>
        <div className="line">
          <label htmlFor="subsPeriod">Plan period</label>
          <Select
            theme={customTheme}
            name="subsPeriod"
            options={periodOptions}
            className=" admin-subs-period"
            placeholder=""
            isSearchable
            onChange={handlePeriod}
          />
        </div>
        <div className="line">
          <label htmlFor="description">Description of plan</label>
          <textarea
            type="text"
            id="description"
            name="description"
            value={allInputs.description}
            className="admin-description"
            onChange={handleChange}
          />
        </div>
        <div className="line">
          <label htmlFor="branding">Showing Branding</label>
          <input
            type="checkbox"
            id="branding"
            name="branding"
            value={allInputs.branding}
            className="admin-branding"
            onChange={handleChange}
            checked={allInputs.branding}
          />
        </div>
        <div className="buttons">
          <button className="submit">Add</button>
        </div>
      </form>
    </div>
  );
}

export default AdminForm;
