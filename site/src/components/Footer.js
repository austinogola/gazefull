import {
  Box,
  Text,
  Flex,
  Image,
  Input,
  FormControl,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import FloatingTitle from "./FloatingTitle";
import mainImage from "./Images/main.png";
import logoImage from "./Images/logo.png";

import xImg from "./Images/xcom.png";
import fbImg from "./Images/fb.png";
import tgImg from "./Images/telegram.png";
import igImg from "./Images/ig.png";

import "./styles/Footer.css";

const Footer = () => {
  return (
    <Box id="footer">
      <Flex justifyContent="center">
        <Text fontWeight="700" fontSize="25px">
          GET NEWSLETTER
        </Text>
      </Flex>
      <Flex justifyContent="center">
        <FormControl>
          <Input
            type="email"
            border="none"
            placeholder="Your Email"
            px="10px"
            outline="none"
            h="48px"
            width="300px"
            maxWidth="300px"
            backgroundColor="#f1f1f1"
            borderRadius="10px"
          />

          <Flex justifyContent="center" mt="50px">
            <Button
              type="submit"
              backgroundColor="#2C75FF"
              h="35px"
              px="20px"
              fontWeight="600"
              cursor="pointer"
              outline="none"
              border="none"
              borderRadius="5px"
              color="white"
            >
              SUBSCRIBE
            </Button>
          </Flex>
        </FormControl>
      </Flex>
      <Flex justifyContent="center" alignItems="center" mt="80px">
        <Flex w="80%" flexWrap="wrap" id="footerHolder">
          <Flex alignItems="center" id="footerLogo">
            <Image src={logoImage} width={40} />
          </Flex>
          <Flex
            justifyContent="space-around"
            alignItems="center"
            id="footerLinks"
          >
            <Link to="/" textDecoration="none">
              Home
            </Link>
            <Link to="/terms" textDecoration="none">
              Terms
            </Link>
            <Link to="/privacy" textDecoration="none">
              Privacy
            </Link>
            <Link to="/contact" textDecoration="none">
              Contact
            </Link>
          </Flex>
          <Flex alignItems="center" id="footerSocial">
            <Link to="#">
              <Image src={fbImg} w="25px" />
            </Link>
            <Link to="#">
              <Image src={igImg} w="25px" />
            </Link>
            <Link to="#">
              <Image src={tgImg} w="25px" />
            </Link>
            <Link to="#">
              <Image src={xImg} w="25px" />
            </Link>
          </Flex>
        </Flex>
      </Flex>

      <Flex justifyContent="center" alignItems="center" mb="20px" mt="10px">
        <Text m={0} fontSize="8px">
          CopyRight &#169;, GazeGuard, 2024
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;
