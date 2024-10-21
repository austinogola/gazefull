
import {Box,
    Text,
    Flex} from '@chakra-ui/react'

const FloatingTitle=({text})=>{
    return(
        <Box width='fit-content' padding='3px' textAlign='center'
        paddingLeft='12px' paddingRight='12px' pt='10px'
        borderRadius='5px' boxShadow='1px 3px 3px rgba(0,0,0,0.5)' marginBottom='30px'>
            <Text color='#2c75ff' margin='0px' fontWeight='600' fontSize='18px'
            className='title'
            >{text}</Text>

        </Box>
    )
}

export default FloatingTitle