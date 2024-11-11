
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

const OurSpecialty=()=>{
    return(
        <Box height={600} padding='0px' mb='150px'

        backgroundColor='white' position='relative' id='explore'>

            <Flex justifyContent='center' alignItems='center'>
                <FloatingTitle text={"Our Specialty"}/>
            </Flex>
            <Box textAlign='center' >
            
                    <Text lineHeight='50px'margin={0} fontWeight='500' fontSize='2.5rem'
                    className='title'>
                    Complete Solution For Your Fitnah Free</Text>
                    <Text margin={0} fontWeight='500' fontSize='2.5rem' className='title'>
                    your <Text as='span' color='#2C75FF'>Browsing</Text>
                    </Text>
            </Box>

           
            <Flex justifyContent='center' alignItems='center'>
            {/* <Text textAlign='center' w='60%' fontSize='14px' className='reg'>
            Nulla facilisi. Donec laoreet velit at dui interdum, et
            rhoncus leo vehicula. Nam rutrum diam eu
            pellentesque ornare. Maecenas laoreet turpis pharetra
            imperdiet conseqdddduat. In finibus mauris sed
            vestibulum sodales. Donec luctus, ipsum ut bibendum
            dictum, turpis tortor molestie diam, consequat auctor
                sem nisi id eros.</Text> */}
            </Flex>

            <Flex justifyContent='center' alignItems='center' mt='75px'>
                <Flex w='70%' justifyContent='space-between' alignItems='center'>
                    <Feature text={'Huge Collection'} num={'01'}
                        explanation='Our huge collection of image database powered by real time image collection processing allows us to maintain a 98% success rate when blurring the opposite gender. '
                    />

                    <Feature text={'Accurate Blurs'} num={'02'}
                        explanation='Our models are trained to the nitty gritty to ensure every piece of content is being blurred efficiently.'
                    />
                        
                    <Feature text={'Top Resource'} num={'04'}
                        explanation=' Our experts have designed this better for you extension using top resources to help muslims globally. '
                    />

                    <Feature text={'Big Community'} num={'05'}
                        explanation='Nulla facilisi. Donec laoreet velit at dui interdum'
                    />
                </Flex>
            </Flex>

            
            
        </Box>
    )
    
}

export default OurSpecialty

