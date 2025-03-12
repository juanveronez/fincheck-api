import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { DatabasesModule } from './shared/databases/databases.module';

@Module({
  imports: [UsersModule, DatabasesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
