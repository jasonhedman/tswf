import { useEffect, useState } from 'react'
import { Song } from '../types/game';


const useGame = () => {

    const [songs, setSongs] = useState<Song[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [isGameOver, setIsGameOver] = useState<boolean>(false);

    const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
    const [currentOptions, setCurrentOptions] = useState<string[]>([]);
    const [currentCorrectIndex, setCurrentCorrectIndex] = useState<number>(0);

    const [numCorrect, setNumCorrect] = useState<number>(0);

    useEffect(() => {
        const getData = async () => {
            const songs = await fetch('/api/songs').then(res => res.json());
            setSongs(songs);
            setLoaded(true);
        }
        if(!loaded) {
            getData();
        }
    }, [loaded]);

    useEffect(() => {
        if(songs.length > 0){
            updateCurrentOptions(0);
        }
    }, [songs]);

    const answerQuestion = (index: number) => {
        if (index === currentCorrectIndex) {
            setNumCorrect(numCorrect + 1);
        }
        nextQuestion();
    }

    const nextQuestion = () => {
        const nextIndex = currentSongIndex + 1;
        setCurrentSongIndex(nextIndex);
        if (nextIndex < songs.length) {
            updateCurrentOptions(nextIndex);
        } else {
            setIsGameOver(true);
        }
    }

    const updateCurrentOptions = (nextIndex: number) => {
        const shuffledSongTitles = songs
            .filter((_, index) => index !== nextIndex)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3)
            .concat(songs[nextIndex])
            .sort(() => 0.5 - Math.random())
            .map(song => song.title);
        setCurrentOptions(shuffledSongTitles);
        setCurrentCorrectIndex(shuffledSongTitles.indexOf(songs[nextIndex].title));
    }


    return {
        currentSong: songs[currentSongIndex],
        currentOptions,
        loaded,
        numCorrect,
        currentSongIndex,
        isGameOver,
        answerQuestion
    }
}

export default useGame;