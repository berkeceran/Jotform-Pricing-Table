/* eslint-disable no-unused-vars */
import React, { useState } from "react";

function AdminAddFeature(props) {
  const [newFeature, setNewFeature] = useState({});
  let name = "";
  let value = "";

  const handleChange = (e) => {
    if (e.target.name === "input") {
      name = e.target.value;
    }
    if (e.target.name === "value") {
      value = e.target.value;
    }
  };

  const addObject = () => {
    if (name.trim() === "") return alert("Feature Name can not be empty");
    if (value.trim() === "") return alert("Feature Value can not be empty");

    const requestOptions = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        feature_name: name,
        value: value,
      }),
    };
    fetch(
      `https://i-seven.jotform.dev/intern-api/pricings/create_feature?id=${props.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then(() => {
        let feature = {
          id: Math.floor(Math.random() * 10000 + 1),
          feature_name: name,
          value: value,
        };
        props.newRow.extra.push(feature);
        setNewFeature(feature);
        closeFeature();
      });
  };

  const closeFeature = () => {
    props.setAddFeature(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.setAddFeature(false);
  };

  return props.addFeature ? (
    <div className="popup">
      <div className="popup-inner">
        <div className="popup-title">Add Feature</div>
        <div className="admin-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="edit-feature"
            placeholder="What is your new Feature Name"
            onChange={handleChange}
            name="input"
          ></input>
          <input
            type="text"
            className="edit-feature"
            placeholder="What is your new Feature Value"
            onChange={handleChange}
            name="value"
          ></input>
          <div className="buttons">
            <button
              className="add-features"
              style={{ margin: "0 26px 26px"}}
              onClick={addObject}
            >
              Add
            </button>
            <button
              className="close-btn"
              style={{
                marginRight: "-2%",
                marginTop: "-2%",
              }}
              onClick={closeFeature}
            ></button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default AdminAddFeature;
