import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateTaskDto{
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    name: string;

    @IsString()
    @IsNotEmpty({message: "EL campo es requerido"})
    @MinLength(3)
    @MaxLength(250)
    description: string;

    @IsBoolean()
    @IsNotEmpty()
    priority: boolean;

    @IsInt()
    @IsOptional()
    user_id: number;
}