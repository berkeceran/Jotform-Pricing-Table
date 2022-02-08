import React, { useState } from "react";
import { ChromePicker } from "react-color";

function Color() {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };
  console.log(displayColorPicker);

  const handleClose = () => {
    setDisplayColorPicker(false);
  };
  const popover = {
    position: "absolute",
    zIndex: "2",
  };
  const cover = {
    position: "fixed",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
  };

  return (
    <div>
      <button onClick={handleClick}>Pick Color</button>
      {displayColorPicker ? (
        <div style={popover}>
          <div style={cover} onClick={handleClose} />
          <ChromePicker />
        </div>
      ) : null}
    </div>
  );
}

export default Color;
