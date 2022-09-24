import React from 'react'

import { 
    Text, 
    HStack,
    Progress,
    Flex,
    VStack,
    SimpleGrid
} from '@chakra-ui/react'

import Card from './Card'
import Lyric from './Lyric'
import Answers from './Answers'
import useGame from '../hooks/useGame'


const Game = () => {

    const {
        currentSong,
        currentOptions,
        loaded,
        numCorrect,
        currentSongIndex,
        isGameOver,
        answerQuestion
    } = useGame();

    if(!loaded){
        return (
            <Progress 
                isIndeterminate
            />
        )
    }

    if(isGameOver){
        return (
            <Card
                w='100%'
            >
                <Text
                    fontSize='2xl'
                    fontWeight='bold'
                >
                    Game Over
                </Text>
                <Text>
                    You got {numCorrect} / {currentSongIndex} correct!
                </Text>
            </Card>
        )
    }

    return (
        <Card
            w='100%'
        >
            <Flex
                flexDirection='column'
                gap={4}
            >
                <VStack
                    flexDirection='column'
                    gap={2}
                >
                    <Text
                        fontSize='2xl'
                        fontWeight='bold'
                    >
                        Taylor Swift Guessing Game
                    </Text>
                    <Text
                        fontSize='md'
                        fontWeight='bold'
                    >
                        {numCorrect} / {currentSongIndex} Correct
                    </Text>
                </VStack>
                <SimpleGrid
                    alignItems='flex-start'
                    columns={2}
                >
                    <Lyric 
                        lyric={currentSong.lyric}
                    />
                    <Answers 
                        options={currentOptions}
                        answerQuestion={answerQuestion}
                    />
                </SimpleGrid>
            </Flex>
        </Card>
    )
}

export default Game