/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Select from "react-select";

function CampaignEditPopups(props) {
  const [newRow, setNewRow] = useState(props.currentRow);

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

  const handlePlan = (e) => {
    setNewRow((prevValues) => {
      console.log(prevValues);
      return {
        ...prevValues,
        pricing_id: e.value,
      };
    });
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
      ` https://i-seven.jotform.dev/intern-api/campaigns/update?id=${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then(() => {
        props.editData(newRow);
        props.setEditPopUp(false);
      });
  };

  const handleClose = () => {
    props.getData();
    props.setEditPopUp(false);
  };

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

  return props.editPopUp ? (
    <div className="popup">
      <div className="popup-inner">
        <div className="popup-container">
          <div className="popup-title">Edit Campaign</div>
          <button className="close-btn" onClick={handleClose}></button>
          <div className="popup-content">
            <div className="admin-page">
              <form className="admin-form" onSubmit={handleSubmit}>
                {newRow &&
                  Object.keys(newRow).map(function (key) {
                    let item = newRow[key];
                    return (
                      <div key={key} className="line">
                        {key !== "form_id" &&
                        key !== "id" &&
                        key !== "pricing_id" &&
                        key !== "active" ? (
                          <label key={key} htmlFor={key}>
                            {key === "campaign_name"
                              ? "Name:"
                              : key === "start_date"
                              ? "Start Name:"
                              : key === "end_date"
                              ? "End Date:"
                              : key === "pricing_name"
                              ? "Plan Name:"
                              : key.charAt(0).toUpperCase() +
                                key.slice(1) +
                                ":   "}
                          </label>
                        ) : (
                          ""
                        )}
                        {key !== "form_id" &&
                        key !== "id" &&
                        key !== "pricing_id" &&
                        key !== "active" ? (
                          key === "pricing_name" ? (
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
                              placeholder={item}
                              isSearchable
                              onChange={handlePlan}
                            />
                          ) : (
                            <input
                              name={key}
                              value={item}
                              disabled={key === "id"}
                              onChange={handleChange}
                            />
                          )
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  })}
                <div className="buttons">
                  <button className="update-features">Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default CampaignEditPopups;
