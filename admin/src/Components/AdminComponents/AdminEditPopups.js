/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./AdminPopups.css";
import "./Admin.scss";
import AdminAddFeature from "./AdminAddFeature";
import { RiDeleteBin6Line } from "react-icons/ri";
function AdminEditPopups(props) {
  const [newRow, setNewRow] = useState(props.currentRow);
  const [addFeature, setAddFeature] = useState(false);
  let id = props.currentRow.id;
  let name;
  let value;

  // Feature input alanı değişmiyordu, defaultValue yaptım böyle yapınca oldu ve bozulmadı neden bilmiyorum

  useEffect(() => {
    setNewRow(props.currentRow);
  }, [props.currentRow]);

  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setNewRow((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleChangeExtra = (e) => {
    name = e.target.name;
    value = e.target.value;

    newRow.extra.forEach(function (curVal, index) {
      if (curVal.feature_name === name) {
        newRow.extra[index].value = value;
      }
    });

    setNewRow(newRow);
  };

  const editStyle = {
    color: "#DF421D",
    position: "relative",
    right: "-480px",
    top: "-40px",
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRow),
    };
    fetch(
      `https://i-seven.jotform.dev/intern-api/pricings/update?id=${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then(() => {
        props.editData(newRow);
        props.setEditPopUp(false);
      });
  };

  const handleFeature = () => {
    setAddFeature(true);
  };
  const handleClose = () => {
    props.getData();
    props.setEditPopUp(false);
  };

  const deleteFeature = (id, name, value) => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      `https://i-seven.jotform.dev/intern-api/pricings/delete_feature?id=${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then(() => {
        let deleteFeature = [];
        deleteFeature = newRow.extra.filter((item) => item.id !== id);
        newRow.extra = deleteFeature;
        props.getData();
        setNewRow(newRow);
      });
  };

  return props.editPopUp ? (
    <div className="popup">
      <div className="popup-inner">
        <div className="popup-container">
          <div className="popup-title">Edit Plan</div>
          <button className="close-btn" onClick={handleClose}></button>
          <div className="popup-content">
            <div className="admin-page">
              <form className="admin-form">
                {newRow &&
                  Object.keys(newRow).map(function (key) {
                    let item = newRow[key];

                    return (
                      <div key={key} className="line">
                        {key !== "extra" && key !== "active" && key !== "id" ? (
                          <label key={key} htmlFor={key}>
                            {key === "pricing_name"
                              ? "Name:"
                              : key.charAt(0).toUpperCase() +
                                key.slice(1) +
                                ":   "}
                          </label>
                        ) : (
                          ""
                        )}
                        {key !== "extra" && key !== "active" && key !== "id" ? (
                          key === "color" ? (
                            <input
                              name={key}
                              style={{ color: item }}
                              value={item}
                              disabled={key === "id" || key === "color"}
                              onChange={handleChange}
                            />
                          ) : (
                            <input
                              name={key}
                              value={item}
                              disabled={key === "id" || key === "color"}
                              onChange={handleChange}
                            />
                          )
                        ) : newRow[key].length !== 0 && key === "extra" ? (
                          newRow[key].map(function (feature) {
                            return (
                              <div key={feature.id} className="line">
                                <label htmlFor={feature.feature_name}>
                                  {feature.feature_name
                                    .charAt(0)
                                    .toUpperCase() +
                                    feature.feature_name.slice(1) +
                                    ":   "}
                                </label>
                                <input
                                  name={feature.feature_name}
                                  defaultValue={feature.value} // input alanı değişmiyordu böyle yapınca oldu ve bozulmadı neden bilmiyorum
                                  disabled={key === "id"}
                                  onChange={handleChangeExtra}
                                />

                                <RiDeleteBin6Line
                                  className="delete-icons"
                                  onClick={() => {
                                    deleteFeature(
                                      feature.id,
                                      feature.feature_name,
                                      feature.value
                                    );
                                  }}
                                />
                              </div>
                            );
                          })
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  })}
              </form>
              <div className="buttons">
                <button onClick={handleSubmit} className="update-features">
                  Update
                </button>
                <button className="add-features" onClick={handleFeature}>
                  Add Feature
                </button>
              </div>
            </div>
          </div>
        </div>
        <AdminAddFeature
          addFeature={addFeature}
          setAddFeature={setAddFeature}
          setNewRow={(newValue) => {
            setNewRow(newValue);
          }}
          newRow={newRow}
          id={id}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  ) : (
    ""
  );
}

export default AdminEditPopups;
