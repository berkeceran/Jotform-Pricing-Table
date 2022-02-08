/* eslint-disable no-unused-vars */
import React, { useMemo, useState, useRef, useEffect } from "react";
import { useTable, useRowSelect } from "react-table";
import { AiFillEdit } from "react-icons/ai";

import TableColumns from "./TableColumns.js";
import "./AdminTable.scss";
import AdminPopups from "../AdminComponents/AdminPopups";
import AdminForm from "../AdminComponents/AdminForm";
import AdminEditPopups from "../AdminComponents/AdminEditPopups";

import TableRows from "./TableRows";
import AdminAddFeature from "../AdminComponents/AdminAddFeature";
import ColorPicker from "../ColorPicker";
import ColorPopUp from "../AdminComponents/ColorPopUp";
import MySwitch from "../MySwitch/MySwitch";
import SwitchButton from "../MySwitch/SwitchButton";

function AdminTable() {
  const columns = useMemo(() => TableColumns, []);
  const [data, setData] = useState([]);

  const [popUp, setPopUp] = useState(false);
  const [editPopUp, setEditPopUp] = useState(false);
  const [checked, setChecked] = useState(false);
  const [colorCheck, setColorCheck] = useState(false);
  const [currentColor, setCurrentColor] = useState("");

  const [currentRow, setCurrentRow] = useState({});
  const [colorRow, setColorRow] = useState({});

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetch("https://i-seven.jotform.dev/intern-api/pricings/read?active=")
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
      `https://i-seven.jotform.dev/intern-api/pricings/update?id=${id}`,
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
    const requestOptions = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        pricing_name: newData.pricing_name,
        price: newData.price,
        period: newData.period,
        descriptions: newData.descriptions,
        branding: newData.branding,
      }),
    };
    fetch(
      "https://i-seven.jotform.dev/intern-api/pricings/create",
      requestOptions
    )
      .then((response) => response.json())
      .then(() => {
        getData();
      });
  };
  const insertColor = (e) => {
    setData((prev) => {
      prev.map((item) => {
        if (item.id === colorRow.id) {
          item["color"] = e;
          setData(data);

          const requestOptions = {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(item),
          };
          fetch(
            `https://i-seven.jotform.dev/intern-api/pricings/update?id=${item.id}`,
            requestOptions
          )
            .then((response) => response.json())
            .then(() => {
              getData();
            });
        }
        return getData();
      });
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

  const colorHandler = (e) => {
    setColorCheck(true);
    setColorRow(e);
  };

  return (
    <div>
      {
        //<MySwitch />
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
                  <th>Color</th>
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
                    colorHandler={colorHandler}
                  />
                );
              })}
            </tbody>
          </table>
        </>
      </div>
      <button className="add-subscription" onClick={clickHandler}>
        {" "}
        Add new Plan{" "}
      </button>
      <AdminPopups trigger={popUp} setPopUp={setPopUp}>
        <AdminForm insertData={insertData} />
      </AdminPopups>

      <ColorPopUp trigger={colorCheck} setPopUp={setColorCheck}>
        <ColorPicker insertColor={insertColor} />
      </ColorPopUp>

      <AdminEditPopups
        currentRow={currentRow}
        editPopUp={editPopUp}
        setEditPopUp={setEditPopUp}
        editData={editData}
        getData={getData}
      ></AdminEditPopups>
      <AdminAddFeature getData={getData} />
    </div>
  );
}

export default AdminTable;
