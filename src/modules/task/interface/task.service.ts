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

    public async getTaskById(id: number): Promise<task> {
        const task= await this.prisma.task.findUnique({
            where:{id}
        });
        return task;

    }

    public async insertTask(@Body() task: CreateTaskDto): Promise<task>  {
        const newTask=await this.prisma.task.create({
            data:task
        });
        return newTask;
        
    }

    public async updateTask(id:number,taskUpdate: updateTaskDto): Promise<task> {
        const task=await this.primsa.task.update({
            where:{id},
            data: taskUpdate
        });
    }

    public async deleteTask(id: number): Promise<task> {
        const task=await this.prisma.task.delete({
            where:{id}
        });
        return task;
    }

}