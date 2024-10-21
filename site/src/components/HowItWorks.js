import React, { useEffect, useState } from "react";
import "./styles/HowItWorks.css";
import Steps from "./newSteps";
import laptopImage from "./Images/lapi.png";
import bigLogoImage from "./Images/logo-bigger.png";

const LazyImage = ({ src, alt, className }) => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setImageSrc(src);
  }, [src]);

  return imageSrc ? (
    <img src={imageSrc} alt={alt} className={className} loading="lazy" />
  ) : (
    <div
      className={`image-placeholder ${className}`}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

const HowItWorks = () => {
  return (
    <div>
      <div className="howItWorksTopDiv">
        <div className="howItWorksFloatingTitle title">
          <h4>How It Works</h4>
        </div>
        <div>
          <h4 className="title" style={{ fontSize: "2rem" }}>
            Complete Solution for <br /> your{" "}
            <span style={{ fontSize: "2rem" }} className="extensionSpan">
              Extension
            </span>{" "}
          </h4>
          <p className="reg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            porta ante non ante dignissim aliquam. Pellentesque nunc leo,
            pretium a lorem vel, ornare mollis leo.
          </p>
        </div>
      </div>
      <div className="how-it-works-section">
        <div className="steps-container">
          <Steps num={1} title='Download The Extension' para='Navigate to the Google extension store and click “add to chrome”.'/>
          <Steps num={2} title='Pin The Extension' para='Once successfully downloaded, make sure to right click and pin the extension for better use case ability. '/>
          <Steps num={3} title='Blacklist / Whitelist' para='Gaze Guard allows you to whitelist/blacklist any domain you wish. However, it is not mandatory. '/>
          <Steps  num={4} title='Voila, You’re All Set' para='Finally, enjoy fitnah free browsing internet wide without any hassles and obstacles. Spread the word so Muslims around the world can lower their gaze and gain rewards for it.'/>
        </div>
        <div className="image-container">
          <LazyImage src={laptopImage} alt="How the extension works" />
        </div>
        <div className="bigLogoImage">
          <LazyImage src={bigLogoImage} alt="bigLogoImage" />
        </div>
      </div>
    </div>
  );
};

export default React.memo(HowItWorks);
