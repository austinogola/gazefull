
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
import Step from './Step';
import mainImage from './Images/main.png'
import logoImage from './Images/logo-bigger.png'
import lapiImage from './Images/lapi.png'

const HowWorks=()=>{
    return(
        <Box  padding='0px' mb='150px' height='700px'
        backgroundColor='white' position='relative' id='howWorks'>

            <Flex justifyContent='center' alignItems='center'>
                <FloatingTitle text={"How It Works"}/>
            </Flex>

            <Box textAlign='center' >
                    <Text lineHeight='50px'margin={0} fontWeight='500' fontSize='2.5rem'>
                    Complete Solution for</Text>
                    <Text margin={0} fontWeight='500' fontSize='2.5rem'>
                    your <Text as='span' color='#2C75FF'>Extension</Text>
                    </Text>
            </Box>
            <Flex justifyContent='center' alignItems='center'>
                <Text textAlign='center' w='50%' fontSize='13px'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
                    porta ante non ante dignissim aliquam. Pellentesque nunc leo,
                    pretium a lorem vel, ornare mollis leo.</Text>
            </Flex>
            <Box position='relative' >
                {/* <Box backgroundImage={logoImage} backgroundSize='cover' 
                position='absolute' left='50%'
                border='1px solid red'
                backgroundPosition='center' backgroundRepeat='no-repeat' h='400px' width='100px'>

                </Box> */}
                <Flex height='400px' pt='80px'
                justifyContent='space-between' alignItems='center'  zIndex='5'>
                    <Flex w='55%'  justifyContent='center' alignItems='center'>
                        <Box zIndex='5'>
                            <Step stepText='Step 1'/>
                            <Step stepText='Step 2'/>
                            <Step stepText='Step 3'/>
                            <Step stepText='Step 4'/>

                        </Box>
                    </Flex>
                    <Flex alignItems='center' justifyContent='flex-end' 
                     zIndex='5'>
                        <Image src={lapiImage} w="500px"/>
                    </Flex>
                </Flex>
                <Box position='absolute' left='42%' top='100px' zIndex='1'>
                    <Image src={logoImage} w='200px'/>
                </Box>
            </Box>
            
        </Box>
    )
    
}

export default HowWorks

