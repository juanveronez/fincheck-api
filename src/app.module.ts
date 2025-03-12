import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { DatabasesModule } from './shared/databases/databases.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [UsersModule, DatabasesModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
