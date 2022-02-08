/* eslint-disable no-unused-vars */
import React, { useMemo, useState, useRef, useEffect } from "react";
import { useTable, useRowSelect } from "react-table";
import TableColumns from "./CampaignColumns";
import CampaignEditPopups from "./CampaignEditPopups";
//import "../AdminComponents/AdminTable.scss";
import CampaignForm from "./CampaignForm";
import CampaignPopups from "./CampaignPopups";

import TableRows from "./CampaignRows";
import MySwitch from "../MySwitch/MySwitch";
import SwitchButton from "../MySwitch/SwitchButton";
function Campaign() {
  const columns = useMemo(() => TableColumns, []);
  const [data, setData] = useState([]);
  const [plans, setPlans] = useState([]);

  const [popUp, setPopUp] = useState(false);
  const [editPopUp, setEditPopUp] = useState(false);
  const [checked, setChecked] = useState(false);
  const [currentRow, setCurrentRow] = useState({});
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error2, setError2] = useState(null);
  const [isLoaded2, setIsLoaded2] = useState(false);

  useEffect(() => {
    getData();
    getPlans();
  }, []);

  const getData = () => {
    fetch(" https://i-seven.jotform.dev/intern-api/campaigns/list?active=")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setData(result.content);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };
  const getPlans = () => {
    fetch(" https://i-seven.jotform.dev/intern-api/pricings/read?active=")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded2(true);
          setPlans(result.content);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded2(true);
          setError2(error);
        }
      );
  };

  const handleChange = (currentRow) => {
    let id = currentRow.id;
    if (currentRow.active === "1") {
      currentRow["active"] = 0;
    } else {
      currentRow["active"] = 1;
    }

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentRow),
    };
    fetch(
      `https://i-seven.jotform.dev/intern-api/campaigns/update?id=${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then(() => {
        getData();
      });
  };
  const editHandler = (row) => {
    setCurrentRow(row);
    setEditPopUp(true);
  };

  const editStyle = {
    color: "#DF421D",
    border: "1px solid black",
  };

  const insertData = (newData) => {
    console.log(newData);
    const requestOptions = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        campaign_name: newData.campaign_name,
        discount: newData.discount,
        type: newData.type,
        descriptions: newData.descriptions,
        start_date: newData.start_date,
        end_date: newData.end_date,
        pricing_id: newData.pricing_id,
      }),
    };
    fetch(
      "https://i-seven.jotform.dev/intern-api/campaigns/create",
      requestOptions
    )
      .then((response) => response.json())
      .then(() => {
        getData();
      });
  };

  const editData = (newData) => {
    let allData = [];
    data.forEach((item) => {
      if (item.id === newData.id) allData.push(newData);
      else {
        allData.push(item);
      }
    });

    setData(allData);
    getData();
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowIds },
  } = useTable(
    {
      columns,
      data,
    },
    useRowSelect
  );

  const clickHandler = () => {
    setPopUp(true);
  };

  return (
    <div>
      {
        //}<MySwitch />
      }
      <SwitchButton />
      <div>
        <>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {" "}
                      {column.render("Header")}{" "}
                    </th>
                  ))}
                  <th>Status</th>
                  <th>Edit</th>
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <TableRows
                    row={row}
                    editStyle={editStyle}
                    editHandler={editHandler}
                    handleChange={handleChange}
                    checked={row.original["active"] === "1" ? true : false}
                    rowStatus={row.original}
                  />
                );
              })}
            </tbody>
          </table>
        </>
      </div>
      <button className="add-subscription" onClick={clickHandler}>
        {" "}
        Add new Campaign{" "}
      </button>
      <CampaignPopups trigger={popUp} setPopUp={setPopUp}>
        <CampaignForm insertData={insertData} plans={plans} />
      </CampaignPopups>

      <CampaignEditPopups
        currentRow={currentRow}
        editPopUp={editPopUp}
        setEditPopUp={setEditPopUp}
        editData={editData}
        getData={getData}
        plans={plans}
      ></CampaignEditPopups>
    </div>
  );
}

export default Campaign;
