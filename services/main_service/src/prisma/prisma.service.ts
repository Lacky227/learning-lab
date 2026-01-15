import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    
    const adapter = new PrismaPg(pool);
    super({ adapter });
  }
    async onModuleInit() {
        try {
            await this.$connect();
            console.log('✅ Connected to database successfully');
        } catch (error) {
            console.error('❌ Database connection failed:', error);
        }
    }
}