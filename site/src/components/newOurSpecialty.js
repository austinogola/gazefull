import React from "react";
import OurSpecialtySteps from "./ourSpecialtySteps";
import "./styles/newOurSpecialty.css";

function OurSpecialty() {
  return (
    <div className="OurSpecialtyParentDiv" id='specialty'>
      <div className="howItWorksTopDiv">
        <div className="howItWorksFloatingTitle title">
          <h4>Our Specialty</h4>
        </div>
        <div>
          <h4 className="title extensionTitle">
          Complete Solution For Your Fitnah Free <br /> {" "}
            <span className="extensionSpann">Browsing</span>{" "}
          </h4>
          <p className="reg">
            We process millions of images / day and have built powerful AI based gender trackers which blur the opposite gender internet wide.
          </p>
        </div>
      </div>
      <div className="ourSpecialtyStepsContainer">
        <OurSpecialtySteps
          title="Huge Collection"
          paragraph='Our huge collection of image database powered by real time image collection processing allows us to maintain a 98% success rate when blurring the opposite gender. '
      
          number="01"
        />
        <OurSpecialtySteps
          title="Accurate Blurs"
          paragraph="Our models are trained to the nitty gritty to ensure every piece of content is being blurred efficiently."
          number="02"
        />
        <OurSpecialtySteps
          title="Top Resource"
          paragraph="Our experts have designed this better for you extension using top resources to help muslims globally."
          number="03"
        />
        <OurSpecialtySteps
          title="Big Community"
          paragraph="Get access to a private community of 35k+ muslims globally in order to connect, learn, win giveaways, and attend private lectures."
          number="04"
        />
      </div>
    </div>
  );
}

export default OurSpecialty;
