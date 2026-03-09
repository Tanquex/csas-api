import { Body, Inject, Injectable } from "@nestjs/common";
import { CreateTaskDto } from "../dto/create-task.dto";
import { Client } from "pg";
import { task } from "../entities/task.entity";
import { updateTaskDto } from "../dto/update-task.dto";
import { PrismaService } from "src/common/services/prisma.service";

@Injectable()
export class TaskService {

    constructor(
        @Inject('MYSQL_CONNECTION') private mysqlConnection: any,
        @Inject('PostgreSQL_CONNECTION') private pg:Client,
        private prisma:PrismaService
    ){

    }

    public async listadoTareas(): Promise<task[]> {
        
        const tasks= await this.prisma.task.findMany({
            orderBy:[{name:"asc"}]
        });
        
        return tasks;
    }

    public async getTaskById(id: number): Promise<task |null> {
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

    public async updateTask(id:number,taskUpdate: updateTaskDto): Promise<task  > {
        const task=await this.prisma.task.update({
            where:{id},
            data: taskUpdate
        });
        return task;
    }

    public async deleteTask(id: number): Promise<task> {
        const task=await this.prisma.task.delete({
            where:{id}
        });
        return task;
    }

}