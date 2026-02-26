import { Inject, Injectable } from "@nestjs/common";
import { CreateTaskDto } from "../dto/create-task.dto";
import { Client } from "pg";
import { task } from "../entities/task.entity";

@Injectable()
export class TaskService {

    constructor(
        @Inject('MYSQL_CONNECTION') private mysqlConnection: any,
        @Inject('PostgreSQL_CONNECTION') private pg:Client
    ){

    }

    public async listadoTareas(): Promise<task[]> {
        const query =`select * from tasks Order by name asc `;
        const [res]= await this.mysqlConnection.query(query);
        console.log(res);
        return res as task[];
    }

    public getTaskById(id: number): string {
        return `tarea con ID: ${id}`;

    }

    public insertTask(task: any): any {
        return task;
    }

    public updateTask(id: number, task: string): string {
        return `tarea con ID: ${id} actualizada a: ${task}`;
    }

    public deleteTask(id: number): string {
        return `tarea eliminada id: ${id}`
    }

}