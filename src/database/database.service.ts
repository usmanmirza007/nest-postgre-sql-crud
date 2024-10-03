import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    async onModuleInit() {
        try {
            await this.$connect()
            console.log('prisma connected');
        } catch (error) {
            console.log('err', error);

        }

    }
    async onModuleDestroy() {
        try {
            await this.$connect()
            console.log('prisma disconnected');
        } catch (error) {
            console.log('err', error);

        }

    }
}