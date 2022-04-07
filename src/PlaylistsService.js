const { Pool } = require('pg');

class PlaylistsService{
    constructor(){
        this._pool = new Pool();
    }

    async getPlaylists(playlistId){
        
        const queryPlaylist = {
            text: `SELECT playlists.id, playlists.name
            FROM playlists 
            WHERE id = $1`,
            values: [playlistId],
        };
        const resultPlaylist = await this._pool.query(queryPlaylist);
        
        const querySongs = {
            text: `SELECT songs.id, songs.title, songs.performer FROM playlistsongs
            JOIN songs ON playlistsongs.song_id = songs.id
            WHERE playlistsongs.playlist_id = $1`,
            values: [playlistId],
        }
        const resultSongs = await this._pool.query(querySongs);

        return {
            ...resultPlaylist.rows[0],
            songs: resultSongs.rows,
        }
    }
}

module.exports = PlaylistsService;