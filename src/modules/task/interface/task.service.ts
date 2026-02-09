import { Injectable } from "@nestjs/common";

@Injectable()
export class TaskService {

    public listadoTareas(): string {
        return "Listado de Tareas "
    }

    public getTaskById(id: number): string {
        return 'tarea con ID: ${id}';

    }

    public insertTask(task: string): string {
        return task;
    }

    public updateTask(id: number, task: string): string {
        return 'tarea con ID: ${id} actualizada a: ${task}';
    }

    public deleteTask(id: number): string {
        return 'tarea eliminada id: ${id}'
    }

}