import React from 'react'

import {
    Text,
    Flex,
    Button,
    VStack
} from '@chakra-ui/react'

interface Props {
    options: string[];
    answerQuestion: (index: number) => void;
}

const Answers : React.FC<Props> = ({ options, answerQuestion }) => {
  return (
    <VStack
        flex={1}
        spacing={4}
    >
        <Text
            fontSize='sm'
            fontWeight='bold'
        >
            Answers
        </Text>
        <Flex
            flexDirection='column'
            gap={2}
        >
            {
                options.map((option, index) => (
                    <Button 
                        key={index}
                        onClick={() => answerQuestion(index)}
                    >
                        <Text
                            overflowWrap='break-word'
                        >
                            {option}
                        </Text>
                    </Button>
                ))
            }
        </Flex>
    </VStack>
  )
}

export default Answers