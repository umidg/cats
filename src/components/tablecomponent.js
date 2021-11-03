import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import styled from "styled-components";
import { GetRandom } from "../utils/random";
import { Sort } from "../utils/sort";

// styled components
const CustomCellRow = styled.div((props) => ({
  fontWeight: "600",
  color: props.index % 2 === 0 ? "#9c27b0" : "#3f51b5",
}));

const Overlay = styled.div((props) => ({
  position: "fixed",
  display: props.overlay ? "block" : "none",
  width: "100%",
  height: "100%",
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
  backgroundColor: "rgba(0,0,0,0.5)",
  zIndex: "2",
  cursor: "pointer",
}));

const Image = styled.img((props) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  width: "25%",
  height: "auto",
}));

const Close = styled.p({
  position: "absolute",
  top: "0",
  right: "50px",
  fontSize: "30px",
  color: "white",
  transform: "scale(1.5,1)",
});

// Export component Table
const Table = (props) => {
  // state

  const src = "http://lorempixel.com/400/200/cats";

  const [overlay, setOverlay] = useState({
    show: false,
    src: "",
  });

  // columns
  const columns = [
    {
      name: "Ninja Level",
      selector: (row) => row.ninjaLevel,
      sortable: true,
      sortFunction: (a, b) =>
        Sort(a.ninjaLevel + a.firstName, b.ninjaLevel + b.firstName),
    },
    {
      name: "Name",
      cell: (row, index) => (
        <CustomCellRow index={index}>{row.firstName}</CustomCellRow>
      ),
      selector: (row) => row.firstName,
      sortable: true,
      sortFunction: (a, b) => Sort(a.firstName, b.firstName),
    },
    {
      name: "Age",
      selector: (row) => row.age,
      sortable: true,
      sortFunction: (a, b) => Sort(a.age, b.age),
    },
  ];

  const rowClicked = (e) => {
    setOverlay({ ...overlay, show: true });
  };

  useEffect(() => {
    if (!overlay.show)
      setOverlay({ ...overlay, src: `${src}/${GetRandom(1, 10)}` });
  }, [overlay.show]);

  return (
    <>
      <DataTable
        columns={columns}
        data={props.data}
        onRowClicked={rowClicked}
        highlightOnHover
        pointerOnHover
      />
      <Overlay
        overlay={overlay.show}
        onClick={() => setOverlay({ ...overlay, show: false })}
      >
        <Close>&#10007;</Close>
        <Image
          src={overlay.src}
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      </Overlay>
    </>
  );
};

export default Table;
