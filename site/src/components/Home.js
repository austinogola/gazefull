import { Box } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Main from "./Main";
import AboutSection from "./AboutSection";
import AboutUs from "./AboutUs";
import OurSpecialty from "./newOurSpecialty";
import HowWorks from "./HowWorks";
import Tutorial from "./Tutorial";
import Pricing from "./newPricing";
import Footer from "./Footer";
import mainImage from "./Images/main.png";
import ShowCase from "./ShowCase";
import Features from "./Features";
import Download from "./Download";
import HowItWorks from "./HowItWorks";

function Home() {
  return (
    <Box className="App" padding="0px" overflow="hidden" margin="0px">
      {/* <Navbar/> */}
      <Main />
      <AboutSection />
      <Features />
      <OurSpecialty />
      <HowItWorks />
      {/* <ShowCase/>
      
      <Download/> */}
      {/* <AboutUs/> */}
      {/* <OurSpecialty/> */}
      {/* <HowWorks/> */}
      <Tutorial />
      <Pricing />
      {/* <Pricing/> */}
      <Footer />
      {/*
       */}
    </Box>
  );
}

export default Home;
