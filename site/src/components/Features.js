import React from "react";
import "./styles/features.css";

const SingleFeature = ({ mainText, expl }) => {
  return (
    <div className="single-feature">
      <div className="feature-main-text feature-text">
        <h2>{mainText}</h2>
        <div className="feature-divider"></div>
      </div>
      <div className="feature-expl feature-text">
        <p>{expl}</p>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <div className="features-container" id="features">
      <div className="features-wrapper">
        <SingleFeature
          mainText="Filter Explicit Media"
          expl="Automatically detect and filter out any media content deemed explicit or inappropriate according to your personal or religious standards. Whether you're browsing social media, news websites, or any other online platform, the extension works in real-time to analyze images and videos, blurring or blocking content that doesn't align with your values."
        />
        <SingleFeature
          mainText="Gender-Based Detection"
          expl="Experience advanced gender-based detection, allowing you to filter content based on the gender of the individuals featured in the media. Whether you want to avoid images or videos that prominently feature men, women, or both, the extension provides precise control over what you see."
        />
        <SingleFeature
          mainText="Customizable Settings"
          expl="We understand that everyone has unique needs and preferences, the extension comes with a wide range of customizable settings. You can fine-tune the level of filtering, choose specific types of content to block, and even set different rules for different websites."
        />
        <SingleFeature
          mainText="Seamless Integration"
          expl="Designed to work effortlessly with your favorite web browsers and online platforms, the extension integrates seamlessly into your daily digital routine. Once installed, it operates quietly in the background, requiring minimal interaction from you."
        />
      </div>
    </div>
  );
};

export default Features;
