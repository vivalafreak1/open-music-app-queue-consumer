const { Pool } = require('pg');

class PlaylistsService{
    constructor(){
        this._pool = new Pool();
    }

    async getPlaylists(owner){
        const query = { 
            text: `SELECT playlists.id, playlists.name, users.username
            FROM playlists
            LEFT JOIN users ON users.id = playlists.owner
            WHERE playlists.owner = $1`,
            values: [owner],
        };
        const result = await this._pool.query(query);
        return result.rows;
    }
}

module.exports = PlaylistsService;