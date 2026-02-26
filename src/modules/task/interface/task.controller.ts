import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "../dto/create-task.dto";


@Controller('api/task')
export class TaskController{

    constructor(private taskSvc: TaskService){}

    @Get()
    async listadoTareas():Promise<any[]>{
            return this.taskSvc.listadoTareas();
        }


    @Get(":id")
    public listTaskById(@Param("id") id:string){
        
        return this.taskSvc.getTaskById(parseInt(id));
    }

    @Post()
    public insertTask(@Body() task: CreateTaskDto): any{
        console.error("insertTask",typeof task)
        return this.taskSvc.insertTask(task);
    }

    @Put(":id")
    public updateTask(id:number,task:any){
        return this.taskSvc.updateTask(id,task);
    }

    @Delete(":id")
    public deleteTask(id:number){
        return this.taskSvc.deleteTask(id);
    }



}