import React from 'react'

import {
    Flex,
    Container as ChakraContainer,
} from '@chakra-ui/react'

interface Props {
    children: React.ReactNode;
}

const Container : React.FC<Props> = ({ children }) => {
  return (
    <Flex
        minH='100vh'
        w='100%'
        bg='gray.100'
    >
        <ChakraContainer
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            maxW='2xl'
        >
            {children}
        </ChakraContainer>
    </Flex>
  )
}

export default Container