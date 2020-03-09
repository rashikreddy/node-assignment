const pg = require('pg');
const config = {
    host: 'localhost',
    user: 'postgres',
    password: 'Secure*12345',
    database: 'teams',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
};
var pool = new pg.Pool(config);


executeQuery = async (query, params) => {
    let client = null;
    try {
        client = await pool.connect()
        const res = await client.query(query, params);
        return res
    } catch (error) {
        console.log(' -- exception --', error);
        throw error;
    } finally {
        client.release()
    }
}

module.exports = executeQuery;
