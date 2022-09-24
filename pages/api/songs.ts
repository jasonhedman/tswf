// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Song } from '../../types/game'

interface SongInfo {
    title: string;
    album: string;
    id: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Song[]>
) {
    const taylorSwiftId = await fetch('https://api.musixmatch.com/ws/1.1/artist.search?q_artist=Taylor Swift&page_size=5&apikey=c6917eeedbc054a5e73cc49f6cdd8690')
        .then(res => res.json())
        .then(data => data.message.body.artist_list[0].artist.artist_id);
    const taylorSwiftAlbums = await fetch(`https://api.musixmatch.com/ws/1.1/artist.albums.get?artist_id=${taylorSwiftId}&page_size=8&apikey=c6917eeedbc054a5e73cc49f6cdd8690`)
        .then(res => res.json())
        .then(data => data.message.body.album_list.map((album: any) => album.album.album_id));
    const taylorSwiftSongs = await Promise.all(taylorSwiftAlbums.map(async (albumId: number) => {
        const songs = await fetch(`https://api.musixmatch.com/ws/1.1/album.tracks.get?album_id=${albumId}&page_size=5&apikey=c6917eeedbc054a5e73cc49f6cdd8690`)
            .then(res => res.json())
            .then(data => data.message.body.track_list.map((track: any) => track.track));
        return songs;
    }));
    const songInfo : SongInfo[] = taylorSwiftSongs.flat().map((song: any) => {
        return {
            title: song.track_name,
            album: song.album_name,
            id: song.track_id,
        }
    });
    const songs : Song[] = await Promise.all(songInfo.map(async (song) => {
        const lyrics = await fetch(`https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${song.id}&apikey=c6917eeedbc054a5e73cc49f6cdd8690`)
            .then(res => res.json())
            .then(data => data.message.body);
        return {
            title: song.title.slice(0, 18) + (song.title.length > 18 && "..."),
            album: song.album,
            id: song.id,
            lyric: lyrics.lyrics.lyrics_body.slice(0, lyrics.lyrics.lyrics_body.indexOf('\n')),
        }
    }));
    res.status(200).json(songs.filter(song => Boolean(song.lyric)));
}
