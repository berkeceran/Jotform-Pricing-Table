/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Table from "./Table";

function UserPage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetch("https://i-seven.jotform.dev/intern-api/user/pricings/list")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setData(result.content);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  return (
    <div>
      <Table dataArr={data}></Table>
    </div>
  );
}

export default UserPage;
