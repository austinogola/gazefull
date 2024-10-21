import Main2 from "../components/Main2";
import Main from "../components/Main";
import AboutSection from "../components/AboutSection";
import OurSpecialty from "../components/newOurSpecialty";
import HowItWorks from "../components/HowItWorks";
import Tutorial from "../components/Tutorial";
import Pricing from "../components/newPricing";
import Footer from "../components/Footer";
import BottomImage from "../components/BottomImage";

const Home = () => {
  return (
    <div>
      {/* <Main2/> */}
      <Main />
      <AboutSection />
      <OurSpecialty />
      <HowItWorks />
      <Tutorial />
      <Pricing />
      <BottomImage />
      <Footer />
    </div>
  );
};

export default Home;
