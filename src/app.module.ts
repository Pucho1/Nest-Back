import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; 

import { UserModule } from './auth/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot( `${process.env.MONGO_URI}` ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {
    // console.log(process.env);
  }
}
