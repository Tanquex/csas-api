import { Client } from 'pg';
export const pgProvider={
    provide:'PostgreSQL_CONNECTION',
    useFactory:async()=>{
        const client = new Client({
            host:'localhost',
            port:5432,
            user:'postgres',
            password:'postgres',
            database:'gids6081_db'
        });
        await client.connect();
        return client;
    }
}