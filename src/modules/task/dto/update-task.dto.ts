import { IsBoolean, IsOptional, IsString, MinLength } from "class-validator";

export class updateTaskDto{

    @IsOptional()
    @IsString({message:"Debe ser una cadena de texto"})
    @MinLength(3,{message:'El nombre debe tener 3 caracteres'})
    name?:string;

    
    @IsOptional()
    @IsString({message:"Debe ser una cadena de texto"})
    @MinLength(3,{message:'El nombre debe tener 3 caracteres'})
    description?:string;

    @IsOptional()
    @IsBoolean()
    priority?:boolean;
}