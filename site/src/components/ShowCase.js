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
    import '../App.css'
    import { AiFillCaretLeft,AiFillCaretRight } from "react-icons/ai";

    import { useEffect,useState } from 'react';

    import twoWomen from './Images/resized/2-women-safe.jpg'
    import lingerie1 from './Images/resized/brian-lawson-unsafe.jpg'
    import man1 from './Images/resized/man-safe.jpg'
    import womanSafe from './Images/resized/woman safe.jpg'
    import womanUnSafe from './Images/resized/woman-unsafe2.jpg'
    import anotherWoman from './Images/resized/woman2.jpg'
    import bMan from './Images/bman.jpg'



    const ShowCase=()=>{

        const moveLeft=()=>{
            const imageSlider=document.querySelector('#imageSlider')
            imageSlider.style.transform = `translateX(-${1 * 100}%)`;
        }

        const moveRight=()=>{
            const imageSlider=document.querySelector('#imageSlider')
            imageSlider.style.transform = `translateX(${1 * 100}%)`;
        }

        useEffect(()=>{
            const imgDivs=document.querySelectorAll('#imageGrid div')
            console.log(imgDivs);
            
        },[])
        return(
            <Box  padding='0px' justifyContent='center' id='ShowCase' mb='100px' >
                <Flex w='100%' alignItems='center' justifyContent='center'>
                    <Box w='80%' textAlign='center'>
                        <Text fontSize='3rem' fontWeight='600' textAlign='center' >
                            DETECT AND BLUR NSFW CONTENT
                        </Text>
                    </Box> 
                </Flex>
                {/* <Flex w='100%' justifyContent='center'  px='10px'>
                        <Flex flexWrap='wrap' justifyContent='center' w='80%' id='imageGrid'>
                            <Box w='30%' h='410px' overflow='hidden'
                                minW='300px' border='2px solid white' padding=''
                                perspective='1000px'>

                                <Box id='front' w='100%' h='410px' overflow='hidden'>
                                    <Image src={man1} w='100%' display='block'/>
                                </Box>

                                <Box id='back' w='100%' h='410px' overflow='hidden'>
                                    <Image src={womanSafe} w='100%' display='block'/>
                                </Box>

                                
                            </Box>
                            <Box w='30%' minW='300px' perspective='1000px'
                            h='410px' overflow='hidden'border='2px solid white' padding=''>
                                <Image src={womanSafe} w='100%' display='block'/>
                            </Box>
                            <Box w='30%' minW='300px'h='410px' overflow='hidden'
                            perspective='1000px' border='2px solid white' padding=''>
                                <Image src={lingerie1} w='100%' display='block'/>
                            </Box>
                            <Box w='30%' minW='300px'h='410px' overflow='hidden'
                            perspective='1000px' border='2px solid white' padding=''>
                                <Image src={womanUnSafe} w='100%' display='block'/>
                            </Box>
                            <Box w='30%' minW='300px'h='410px' overflow='hidden'
                            perspective='1000px' border='2px solid white' padding=''>
                                <Image src={anotherWoman} w='100%' display='block'/>
                            </Box>
                            <Box w='30%' minW='300px'h='410px' overflow='hidden'
                            perspective='1000px' border='2px solid white' padding=''>
                                <Image src={bMan} w='100%' display='block'/>
                            </Box>
                        </Flex>
                    
                    
                   
                    
                        
                </Flex> */}
                    
            </Box>
        )
    }


    export default ShowCase