import React from "react";
import stepIcon from "../images/puzzle.png";
import "./styles/steps.css";

function Steps({num,title,para}) {
  return (
    <div className="stepParentDiv">
      <div className="stepFloating title">
        <p>step {num}</p>
      </div>
      <div className="stepsBodyDiv">
        <div>
          <img src={stepIcon} alt="stepIcon" />
        </div>
        <div className="step_text_holder">
          <h3 className="title">{title}</h3>
          <p className="reg">
           {para}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Steps;
