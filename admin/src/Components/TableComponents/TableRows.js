import React from "react";
import Switch from "react-switch";
import { AiFillEdit } from "react-icons/ai";
import { VscSymbolColor } from "react-icons/vsc";

function TableRows(props) {
  return (
    <tr {...props.row.getRowProps()}>
      {props.row.cells.map((cell) => {
        return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
      })}
      <td>
        <Switch
          onChange={() => props.handleChange(props.rowStatus)}
          checked={props.checked}
        />
      </td>
      <td>
        <AiFillEdit
          className=" icons"
          style={props.editStyle}
          onClick={() => {
            props.editHandler(props.row.cells[0].row.original);
          }}
        />
      </td>
      <td>
        <VscSymbolColor
          className=" color-icon"
          style={props.editStyle}
          onClick={() => props.colorHandler(props.rowStatus)}
        />
      </td>
    </tr>
  );
}

export default TableRows;
