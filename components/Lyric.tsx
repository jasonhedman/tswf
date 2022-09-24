import React from 'react'

import {
  Text,
  VStack
} from '@chakra-ui/react'

interface Props {
  lyric: string;
}

const Lyric : React.FC<Props> = ({ lyric }) => {
  return (
    <VStack
      flex={1}
    >
      <Text
        fontSize='sm'
        fontWeight='bold'
      >
        Lyric
      </Text>
      <Text
        textAlign='center'
      >
        {lyric}
      </Text>
    </VStack>
  )
}

export default Lyric