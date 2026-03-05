
import { Injectable } from '@nestjs/common';
// import { PrismaClient } from '../generated/prisma/client';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import { PrismaMariaDb } from '@prisma/adapter-better-mariadb';
// import {} from '@'

dotenv.config();

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const adapter = new PrismaMariaDb({url:process.env.DATABASE_URL! });
    super({ adapter });
  }
}
