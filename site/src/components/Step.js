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
import Feature from './Feature';
import puzzleImage from './Images/icons8-puzzle-80.png'

const Step=({stepText})=>{
    return(
        <Box position='relative' width='450px' backgroundColor='#EBEBEB'
        borderRadius='10px' height='90px' mb='25px'>
            <Flex alignItems='center' justifyContent='center' height='90px'>
                <Flex w='20%' alignItems='center' justifyContent='start' pl='20px'>
                    <Image src={puzzleImage} w='40px'/>
                </Flex>
                <Box w='80%'>
                    <Text margin={0} fontWeight={500} fontSize='14px'>Go to Chrome Extension</Text>
                    <Text margin={0} fontSize='11px'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Vestibulum porta ante non ante dignissim aliquam
                    </Text>

                </Box>
            </Flex>
            <Box position='absolute' h='20px' w='80px' backgroundColor='#2c75ff'
            py='5px'
            borderRadius='8px' top='-10px' left='20px' textAlign='center' color='white'>
                    <Text as='span' fontSize='13px' fontWeight={400}>{stepText}</Text>
            </Box>  
        </Box>
    )
}

export default Step