import { Body, Inject, Injectable } from "@nestjs/common";
import { CreateTaskDto } from "../dto/create-task.dto";
import { Client } from "pg";
import { task } from "../entities/task.entity";
import { updateTaskDto } from "../dto/update-task.dto";

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

    public async getTaskById(id: number): Promise<task[]> {
         const query =`select * from tasks where id=${id} `;
         const [res]= await this.mysqlConnection.query(query);
        console.log(res);
        return res[0] as task[];

    }

    public async insertTask(@Body() task: CreateTaskDto): Promise<task[]>  {
        const sql= `Insert into tasks(name,description,priority,user_id) values('${task.name}','${task.description}','${task.priority}','${task.user_id}')`;
        const [result]= await this.mysqlConnection.query(sql);
        const insertId=result.insertId;
        return await this.getTaskById(insertId);
        
    }

    public async updateTask(id:number,taskUpdate: updateTaskDto): Promise<task[]> {
        const task= await this.getTaskById(id);
        task.name=taskUpdate.name ?? task.name;
        task.description=taskUpdate.description ?? task.description;
        task.priority=taskUpdate.priority ?? task.priority;

        const query=`update tasks set name='${task.name} ', description='${task.description} ',priority='${task.priority} ' `;
        await this.mysqlConnection.query(query);
        return task;
    }

    public deleteTask(id: number): boolean {
        const query=`Delete from tasks where id=${id}`;
        const[result]= this.mysqlConnection.query(query);
        
        return result.affectedRows>0 ;
    }

}