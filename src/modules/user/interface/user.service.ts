import { Body, Inject, Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { user } from "../entities/user.entity";
import { updateUserDto } from "../dto/update-user.dto";
import { PrismaService } from "src/common/services/prisma.service";

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) { }

    public async listadoUsuarios(): Promise<user[]> {

        const users = await this.prisma.user.findMany({
            orderBy: [{ name: "asc" }],
            select: {
                id: true,
                name: true,
                lastname: true,
                username: true,
                password: false,
                created_at: true
            }
        });

        return users;
    }

    public async getUserById(id: number): Promise<user | null> {
        const user = await this.prisma.user.findUnique({
            where: { id }
        });
        return user;

    }

    public async insertUser(@Body() user: CreateUserDto): Promise<user> {
        const newUser = await this.prisma.user.create({
            data: user,
            select: {
                id: true,
                name: true,
                lastname: true,
                username: true,
                password: false,
                
            }
        });
        return newUser;

    }

    public async updateUser(id: number, userUpdate: updateUserDto): Promise<user> {
        const user = await this.prisma.user.update({
            where: { id },
            data: userUpdate
        });
        return user;
    }

    public async deleteUser(id: number): Promise<user> {
        const user = await this.prisma.user.delete({
            where: { id }
        });
        return user;
    }
    public async getUserByUsername(username: string): Promise<user | null> {
        return this.prisma.user.findFirst({
            where: { username }, 
        });
    }

}