
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

import vidImageBlck from './Images/icons8-video-50-black.png'
import vidImageWht from './Images/icons8-video-50-white.png'

import imageImgBlack from './Images/icons8-image-50-black.png'
import imageImgWhite from './Images/icons8-image-50-white.png'

const Pricing=()=>{
    return(
        <Box mb='150px' padding='0px' className='title'
        backgroundColor='white' position='relative' id='pricing'>

            <Flex justifyContent='center' alignItems='center'>
                <FloatingTitle text={"Pricing"}/>
            </Flex>

            <Box textAlign='center' >
                   
                    <Text margin={0} fontWeight='500' fontSize='2.5rem'>
                     <Text as='span' color='#2C75FF'>Pricing</Text>
                    </Text>
            </Box>
            <Flex justifyContent='center' alignItems='center'>
            <Text textAlign='center' w='70%'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
porta ante non ante dignissim aliquam. Pellentesque nunc leo,
pretium a lorem vel, ornare mollis leo.</Text>
            </Flex>

            <Flex justifyContent='center' alignItems='center' mt='50px'>
                <Flex w='70%' justifyContent='center' alignItems='center'>
                    <Box  h='250px' w='28%' backgroundColor='#F3F3F3'
                    borderTopLeftRadius='30px' borderBottomLeftRadius='30px' p='20px'>

                        <Flex justifyContent='center' alignItems='center' >
                            <Text m={0} backgroundColor='white' color='#2C75FF' className="title"
                            fontWeight='500' pt='5px' pb='5px'
                            textAlign='center' w='50%' borderRadius='999px' fontSize='10px'>
                            RECOMMENDED</Text>
                        </Flex>

                        <Flex justifyContent='center' alignItems='center' mt='5px'>
                            <Text m={0}  color='black'  pt='5px' pb='5px' fontWeight='600'
                            textAlign='center' w='70%' borderRadius='999px' fontSize='18px'>
                           Free Plan</Text>
                        </Flex>

                        <Flex justifyContent='center' alignItems='center' mt='5px'>
                            <Box w='20%' position='relative' top='5px'>
                                <Image src={imageImgBlack} w='25px'/>
                            </Box>
                            <Flex w='50%'>
                                <Text margin='0px' marginRight='10px' fontSize='10px' fontWeight='700'>200</Text>
                                <Text margin='0px' fontSize='12px' fontWeight='400'>Images/Day</Text>
                            </Flex>
                        </Flex>
                        <Flex justifyContent='center' alignItems='center' mt='10px'>
                            <Box w='20%'>
                                <Image src={vidImageBlck} w='25px'/>
                            </Box>
                            <Flex w='50%'>
                                <Text margin='0px' marginRight='10px' fontSize='10px' fontWeight='700'>100</Text>
                                <Text margin='0px' fontSize='12px' fontWeight='400'>Minutes/Day</Text>
                            </Flex>
                        </Flex>

                        <Flex justifyContent='center' alignItems='center' mt='50px'>
                            <Button border='none' outline='none'
                            backgroundColor='#2C75FF' color='white'
                            height='30px' borderRadius='5px'>CHOOSE PLAN</Button>
                        </Flex>

                    </Box>


                    <Box borderRadius='30px' h='290px' w='28%' backgroundColor='#2C75FF' p='20px'>
                        <Flex justifyContent='center' alignItems='center'>
                            <Text m={0} backgroundColor='white' color='#2C75FF' 
                            fontWeight='500' pt='5px' pb='5px'
                            textAlign='center' w='50%' borderRadius='999px' fontSize='10px'>
                            MOST POPULAR</Text>
                        </Flex>
                        <Flex justifyContent='center' alignItems='center' mt='10px'>
                            <Text m={0}  color='white'  pt='5px' pb='5px' fontWeight='600'
                            textAlign='center' w='50%' borderRadius='999px' fontSize='18px'>
                           $6/<Text as='span' fontSize='12px' fontWeight='500'
                           position='relative' bottom='2px'>month</Text></Text>
                        </Flex>
                        <Flex justifyContent='center' alignItems='center' mt='5px'>
                            <Text m={0}  color='white'  pt='5px' pb='5px' fontWeight='600'
                            textAlign='center' w='80%' borderRadius='999px' fontSize='18px'>
                           Premium Plan</Text>
                        </Flex>

                        <Flex justifyContent='center' alignItems='center' mt='5px'>
                            <Box w='20%' position='relative' top='5px'>
                                <Image src={imageImgWhite} w='25px'/>
                            </Box>
                            <Flex w='50%' color='white'>
                                <Text margin='0px' marginRight='10px' fontSize='12px' fontWeight='500'>Unlimited</Text>
                                <Text margin='0px' fontSize='10px' fontWeight='400'>Images</Text>
                            </Flex>
                        </Flex>
                        <Flex justifyContent='center' alignItems='center' mt='10px' color='white'>
                            <Box w='20%'>
                                <Image src={vidImageWht} w='25px'/>
                            </Box>
                            <Flex w='50%'>
                                <Text margin='0px' marginRight='10px' fontSize='12px' fontWeight='500'>200</Text>
                                <Text margin='0px' fontSize='10px' fontWeight='400'>Minutes/Day</Text>
                            </Flex>
                        </Flex>

                        <Flex justifyContent='center' alignItems='center' mt='50px'>
                            <Button border='none' outline='none'
                            backgroundColor='white' color='#2C75FF'
                            height='30px' borderRadius='5px'>CHOOSE PLAN</Button>
                        </Flex>

                        
                        
                    </Box>


                    <Box  h='250px' w='28%' backgroundColor='#F3F3F3'
                    borderTopRightRadius='30px' borderBottomRightRadius='30px' p='20px'>
                        <Flex justifyContent='center' alignItems='center' mt='10px'>
                            <Text m={0}  color='#2C75FF'  pt='5px' pb='5px' fontWeight='600'
                            textAlign='center' w='50%' borderRadius='999px' fontSize='15px'>
                           $9.9/<Text as='span' fontSize='11px' fontWeight='500'
                           position='relative' bottom='0px'>month</Text></Text>
                        </Flex>

                        <Flex justifyContent='center' alignItems='center' mt='7px'>
                            <Text m={0}  color='black'  pt='5px' pb='5px' fontWeight='600'
                            textAlign='center' w='70%' borderRadius='999px' fontSize='18px'>
                           Deluxe Plan</Text>
                        </Flex>
                        <Flex justifyContent='center' alignItems='center' mt='5px'>
                            <Box w='20%'>
                                <Image src={imageImgBlack} w='25px'/>
                            </Box>
                            <Flex w='50%'>
                                <Text margin='0px' marginRight='10px' fontSize='12px' fontWeight='700'>Unlimited</Text>
                                <Text margin='0px' fontSize='10px' fontWeight='500'>Images</Text>
                            </Flex>
                        </Flex>
                        <Flex justifyContent='center' alignItems='center' mt='5px'>
                            <Box w='20%'>
                                <Image src={vidImageBlck} w='25px'/>
                            </Box>
                            <Flex w='50%'>
                                <Text margin='0px' marginRight='10px' fontSize='12px' fontWeight='700'>Unlimited</Text>
                                <Text margin='0px' fontSize='10px' fontWeight='400'>Minutes</Text>
                            </Flex>
                        </Flex>

                        <Flex justifyContent='center' alignItems='center' mt='50px'>
                            <Button border='none' outline='none'
                            backgroundColor='#2C75FF' color='white'
                            height='30px' borderRadius='5px'>CHOOSE PLAN</Button>
                        </Flex>
                    </Box>

                </Flex>
            </Flex>

            {/* <Flex>
                <Flex width='80%' justifyContent='center'>

                </Flex>
            </Flex> */}
            
        </Box>
    )
    
}

export default Pricing

