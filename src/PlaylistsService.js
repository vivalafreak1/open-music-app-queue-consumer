const { Pool } = require('pg');

class PlaylistsService{
    constructor(){
        this._pool = new Pool();
    }

    async getPlaylists(playlistId){
        const query = { 
            text: `SELECT playlists.id, playlists.name
            FROM playlists
            LEFT JOIN users ON users.id = playlists.owner
            WHERE playlists.owner = $1`,
            values: [playlistId],
        };
        const result = await this._pool.query(query);
        return result.rows;
    }
}

module.exports = PlaylistsService;