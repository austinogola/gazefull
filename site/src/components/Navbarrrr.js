import {Box,
    Flex,
    Image,
    List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
    Text,
    HStack,
    Link,
    IconButton,
    Button,
    useDisclosure,
    useColorModeValue,
    Stack,} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import Logo from './Logo';
import logoImage from './Images/logo.png'
import { FiMenu } from "react-icons/fi";

import '../App.css'



  const Links = ['Home', 'Explore', 'Contact', 'Pricing'];

const Navbar=()=>{
    const { isOpen, onOpen, onClose } = useDisclosure();
    return(
            <Flex justifyContent='space-between' alignItems='center'
            id='navbar_parent' margin='0px'  color='white' >
                    <Box alignItems='center' positon='relative' >
                        <Logo bottom={'30px'} />
                    </Box>

                <Box id='compressed_navbar' position='relative' bottom='10px'
                >
                    <Box  cursor='pointer' position='absolute' right='0px' zIndex='10'>
                        <FiMenu size='1.5rem'/>
                    </Box>
                    <UnorderedList position='absolute' right='0px' border='1px solid red'
                    w='50vw' bottom='-320px'backgroundColor='#011627' zIndex='9' pt='50px'>
                        <ListItem>
                            <Link href='#home' fontSize='14px'
                                color='white' fontWeight='500' textDecoration='none'>Home

                            </Link>
                        </ListItem>

                        <ListItem>
                            <Link color='white' href='#ShowCase'  fontSize='14px'
                                fontWeight='500' textDecoration='none'>
                                Explore
                            </Link>
                        </ListItem>

                        <ListItem>
                            <Link color='white' href='#accounts'  fontSize='14px'
                            fontWeight='500' textDecoration='none'>
                            My Account
                            </Link>
                        </ListItem>

                        <ListItem>
                             <Link color='white'fontWeight='500'  fontSize='14px'
                                textDecoration='none'
                                href='#contact'>
                                Contact
                            </Link>
                        </ListItem>

                        <ListItem>

                            <Link href='#install'
                                textDecoration='none' fontWeight='500'>
                                <Button border='none' outline='none' borderRadius='5px'
                                fontWeight='500' p='10px' px='15px' py='10px'
                                boxShadow='0 4px 8px rgba(44, 117, 255, 0.3), 0 6px 20px rgba(44, 117, 255, 0.2)'
                                height='30px' color='white' backgroundColor='#2c75ff'>
                                <Text m='0px' fontWeight={800} fontSize='16px'>Install</Text>
                                    
                                </Button>
                            </Link>

                        </ListItem>
                    </UnorderedList>
                </Box>
                
                <Flex  justifyContent='space-between' alignItems='center'
                    id='navbarItems'>
                    <Link href='#home' fontSize='16px'
                    color='white' fontWeight='500' textDecoration='none'>Home

                    </Link>
                    <Link color='white' href='#ShowCase'  fontSize='16px'
                    fontWeight='500' textDecoration='none'>
                    Explore
                    </Link>
                    {/* <Link color='white' href='#about' fontWeight='400' textDecoration='none'>
                    About
                    </Link> */}
                    <Link color='white' href='#accounts'  fontSize='16px'
                    fontWeight='500' textDecoration='none'>
                    My Account
                    </Link>
                    <Link color='white'fontWeight='500'  fontSize='16px'
                    textDecoration='none'
                    href='#contact'>
                    Contact
                    </Link>
                    {/* <Link href='#pricing'
                      textDecoration='none' fontWeight='500'>
                        <Button border='none' outline='none' borderRadius='6px'
                        fontWeight='500' p='10px' px='20px' 
                        boxShadow='0 4px 8px rgba(44, 117, 255, 0.3), 0 6px 20px rgba(44, 117, 255, 0.2)'
                         height='30px' color='white' backgroundColor='#2c75ff'>
                         <Text m='0px' fontWeight={800} fontSize='16px'>Pricing</Text>
                            
                        </Button>
                    </Link> */}
                    <Link href='#install'
                      textDecoration='none' fontWeight='500'>
                        <Button border='none' outline='none' borderRadius='6px'
                        fontWeight='500' p='10px' px='25px' py='20px'
                        boxShadow='0 4px 8px rgba(44, 117, 255, 0.3), 0 6px 20px rgba(44, 117, 255, 0.2)'
                         height='30px' color='white' backgroundColor='#2c75ff'>
                         <Text m='0px' fontWeight={800} fontSize='16px'>Install</Text>
                            
                        </Button>
                    </Link>
                </Flex>
                
            </Flex>
    )
}

export default Navbar