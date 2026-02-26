import { createConnection } from 'mysql2/promise';

export const mysqlProvider={
    provide: 'MYSQL_CONNECTION',
    useFactory:async()=>{
        const connection=await createConnection({
            host:'localhost',
            port:3307,
            user:'root',
            password:'12345',
            database:'gids6081_db'
        });
        return connection;
    }
}