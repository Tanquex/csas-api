import { Injectable } from "@nestjs/common";
import { CreateTaskDto } from "../dto/create-task.dto";

@Injectable()
export class TaskService {

    public listadoTareas(): string {
        return "Listado de Tareas "
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