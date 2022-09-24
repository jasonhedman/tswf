import React from 'react'

import { Box } from '@chakra-ui/react'

interface Props {
    children: React.ReactNode;
    [x: string]: any;
}

const Card : React.FC<Props> = ({ children, ...props }) => {
  return (
    <Box
        p={8}
        display='flex'
        flexDirection='column'
        position='relative'
        rounded='lg'
        wordBreak='break-word'
        bg='white'
        backgroundClip='border-box'
        {...props}
    >
        {children}
    </Box>
  )
}

export default Card