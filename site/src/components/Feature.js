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
    import logoCircle from './Images/logo_circle.png'
    import logoCirc from './Images/group_logo.png'

const Feature=({text,explanation,num})=>{
    return(
        <Box w='300px'>
            <Flex justifyContent='center' alignItems='center'>
                <Flex w='60px' backgroundColor='#2c75ff' h='60px'
                justifyContent='center' alignItems='center' borderRadius='50%'>
                    <Image src={logoCirc} width="30px"/>
                </Flex>
                
            </Flex>
            <Flex justifyContent='center' alignItems='center' className='title'>
                <Text margin={0} mt='8px' fontWeight={500} 
                fontSize='15px'
                textAlign='center'>{text}</Text>
            </Flex>
            <Flex justifyContent='center' alignItems='center' className='reg'>
                <Text margin={0} mt='8px' fontWeight={400} 
                fontSize='13px'
                textAlign='center'>{explanation}</Text>
            </Flex>
            <Flex justifyContent='center' alignItems='center' className='title'>
                <Text margin={0} mt='8px' fontWeight={500} 
                fontSize='30px'
                textAlign='center'>{num}</Text>
            </Flex>
            
        </Box>
    )
}

export default Feature