import React, { useEffect, useState } from "react";
import "./styles/AboutSection.css";
import logoBigger from "./Images/logo-bigger.png";
import lightImg from "./Images/extLight.png";
import darkImg from "./Images/extDark.png";

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
    <div className={`image-placeholder ${className}`} />
  );
};

const AboutSection = () => {
  return (
    <div className="landing-section" id="about">
      <div className="left-side">
        <div className="image-holder">
          <div className="logoBiggerDiv">
            <LazyImage src={logoBigger} alt="" />
          </div>
          <div className="darkImgDiv">
            <LazyImage src={darkImg} alt="" />
          </div>
          <div className="lightImgDiv">
            <LazyImage src={lightImg} alt="" />
          </div>
        </div>
      </div>
      <div className="right-side">
        <div>
          <h2 className="extensionText title" id="bold">
            High Quality Chrome
            <span className="extensionSpan"> Extension</span>
          </h2>
          <div className="paragraphDiv reg">
            <p>
              Gaze Guard is a Google Chrome extension that helps users comply
              with the Islamic practice of lowering their gaze by blurring out
              images and videos of men and women on websites.
            </p>
            <p>
              By automatically obscuring these visual elements , Gaze Guard
              allows users to browse the internet while maintaining adherence to
              their religious values. Easy to install and use, Gaze Guard
              ensures that your online activities remain respectful and aligned
              with your beliefs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AboutSection);
