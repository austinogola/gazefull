import {Box,
    Text,
    Flex,
    Image,
    HStack,
    Link,
    IconButton,
    Button,
    useDisclosure,
    useColorModeValue,
    Stack,} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import Logo from './Logo';
import FloatingTitle from './FloatingTitle';
import mainImage from './Images/main.png'
import logoImage from './Images/logo-bigger.png'
import '../App.css'

const AboutUs=()=>{
    return(
        <Flex height={500} padding='0px' pr='100px' pl='100px' 
        backgroundColor='white' position='relative' mb='100px' id='about'>
            <Box position='relative'  width='50%'>
                <Box position='absolute' right='20px' height='180px'width='180px'
                    backgroundImage={logoImage} padding={0} backgroundSize='contain' 
                    backgroundPosition='center' backgroundRepeat='no-repeat' >
                </Box>

            </Box>
            <Box width='50%'>
                <FloatingTitle text={'About Us'}/>
                <Box >
                    <Text lineHeight='50px'margin={0} fontWeight='500' fontSize='2.5rem'>High Quality</Text>
                    <Text margin={0} fontWeight='500' fontSize='2.5rem'>
                    Chrome <Text as='span' color='#2C75FF'>Extension</Text>
                    </Text>
                </Box>
                <Box>
                    <Text fontSize='15px' fontWeight='400'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Vestibulum porta ante non ante dignissim aliquam.
                        Pellentesque nunc leo, pretium a lorem vel, ornare
                        mollis leo.
                    </Text>
                    <Text mt='20px' fontSize='15px' fontWeight='400'>
                        Nulla facilisi. Donec laoreet velit at dui interdum, et
                        rhoncus leo vehicula. Nam rutrum diam eu
                        pellentesque ornare. Maecenas laoreet turpis pharetra
                        imperdiet conseqdddduat. In finibus mauris sed
                        vestibulum sodales. Donec luctus, ipsum ut bibendum
                        dictum, turpis tortor molestie diam, consequat auctor
                        sem nisi id eros
                    </Text>

                    <Button outline='none' border='none' backgroundColor='#2c75ff'
                    color='white' borderRadius='7px' padding='10px' fontWeight='500'
                    paddingLeft='15px' paddingRight='15px'
                    boxShadow='0 4px 8px rgba(44, 117, 255, 0.3), 0 6px 20px rgba(44, 117, 255, 0.2)'
                    >Learn More</Button>
                </Box>
                
            </Box>
        </Flex>
    )
}
export default AboutUs