import { Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { TaskService } from "./task.service";


@Controller('api/task')
export class TaskController{

    constructor(private taskSvc: TaskService){}

    @Get()
    public listadoTareas():string{
            return this.taskSvc.listadoTareas();
        }


    @Get(":id")
    public listTaskById(@Param("id") id:string){
        
        return this.taskSvc.getTaskById(parseInt(id));
    }

    @Post()
    public insertTask(task:any){
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