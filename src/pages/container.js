import React, { useEffect, useState } from "react";
import TableComponent from "../components/tablecomponent";
import { callApi } from "../api/index";
import { USER_API } from "../constants/index";
import { Sort } from "../utils/sort";
import { GetRandom } from "../utils/random";


const Container = () => {
  const [state, setState] = useState({
    apiData: [],
    firstNameData: [],
  });

  useEffect(() => {
    callApi(USER_API)
      .then((data) => {
        const names = [];
        const changedData = data.map((node) => {
          names.push(node.firstName);
          return {
            age: GetRandom(5, 1),
            firstName: node.firstName,
            ninjaLevel: GetRandom(100, 0),
          };
        });
        changedData.sort((a, b) =>
          Sort(
            Number(a.ninjaLevel),
            Number(b.ninjaLevel),
            "DESC",
            a.firstName,
            b.firstName
          )
        );

        setState({ ...state, firstNameData: names, apiData: changedData });
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      {state.apiData.length ? (
        <TableComponent data={state.apiData} />
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};

export default Container;
