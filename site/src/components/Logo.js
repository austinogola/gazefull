

import React from "react"
import { Box, Text ,Image,Flex,Link} from "@chakra-ui/react"

import logoBackground from './Images/logo.png'
import logoForeGround from './Images/GazeGuard-White.png'


export default function Logo({bottom}) {
  return (
    <Box position='relative'  w='4rem' bottom={bottom}>
      <Link href='/'>
        <Box position='absolute' top='0px' left='1.2rem' >
          <Image src={logoBackground} width='3.2rem'/>
        </Box>

      </Link>            
     
    </Box>
  )
}