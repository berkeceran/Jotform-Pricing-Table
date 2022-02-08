import React, { useEffect } from "react";

const SubscribeButton = ({ formID }) => {
  useEffect(() => {
    new global.JotformFeedback({
      formId: formID,
      base: "https://form.jotform.com/",
      windowTitle: "Form",
      background: "#FFA500",
      fontColor: "#FFFFFF",
      type: "0",
      height: 500,
      width: 700,
      openOnLoad: false,
    });
  }, []);

  const classNames = ["btn", "Sign-up"];

  if (formID) {
    classNames.push("lightbox-" + formID);
  }

  return <button className={classNames.join(" ")}>Subscribe</button>;
};

export default SubscribeButton;
