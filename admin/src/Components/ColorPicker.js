import React, { useState } from "react";
import { SketchPicker } from "react-color";

function ColorPicker(props) {
  const [color, setColor] = useState();
  const handleChange = (color) => {
    setColor(color);
    props.insertColor(color.hex);
  };

  return (
    <div className="App">
      <SketchPicker color={color} onChangeComplete={handleChange} />
    </div>
  );
}

export default ColorPicker;
