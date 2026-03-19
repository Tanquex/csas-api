import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "../dto/create-task.dto";
import { task } from "../entities/task.entity";
import { updateTaskDto } from "../dto/update-task.dto";


@Controller('api/task')
export class TaskController{

    constructor(private taskSvc: TaskService){}

    @Get()
    async listadoTareas():Promise<task[]>{
            return this.taskSvc.listadoTareas();
        }


    @Get(":id")
    public async listTaskById(@Param("id", ParseIntPipe) id:number): Promise<task>{
        const result= await this.taskSvc.getTaskById(id);
        console.log("tipo de dato: ",typeof result)
        if (result==undefined){
            throw new HttpException(`Tarea con id ${id} no encontrada`,HttpStatus.NOT_FOUND);
            
        }
        return result;
    }

    @Post()
    public async insertTask(@Body() task: CreateTaskDto): Promise<task>{
        const result= await this.taskSvc.insertTask(task);
        if (result==undefined)
            throw new HttpException(`Tarea No Registrada`,HttpStatus.INTERNAL_SERVER_ERROR)
        return result;
        

    }

    @Put(":id")
    public async updateTask(@Param("id", ParseIntPipe) id:number,@Body() task:updateTaskDto):Promise<task>{
        return await this.taskSvc.updateTask(id,task);
    }

    @Delete(":id")
    public async deleteTask(@Param("id",ParseIntPipe) id:number): Promise<Boolean>{
        try{
            await this.taskSvc.deleteTask(id);

        }catch(error){
            throw new HttpException("task not found",HttpStatus.NOT_FOUND);

        }
        return true;
    }



}