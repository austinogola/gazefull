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


    const Download=()=>{
        return (
            <Flex h='100px' justifyContent='center' alignItems='center' mb='150px'
            id='download'>
                <Link href='#' >
                    <Button outline='none' border='none' fontWeight='600'
                    backgroundColor='#2c75ff' borderRadius='10px'
                    color='white' px='20px' py='20px'>DOWNLOAD NOW FOR FREE</Button>
                </Link>
            </Flex>
        )
    }

    export default Download