import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { DatabasesModule } from './shared/databases/databases.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/auth.guard';

@Module({
  imports: [UsersModule, DatabasesModule, AuthModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
