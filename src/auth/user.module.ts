import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthController } from './auth.controller';
import { User, UserSchema } from './entities/user.entity';
import { UserService } from './user.service';
import { GestionController } from './gestion.controller';

@Module({
  controllers: [
    AuthController, 
    GestionController,
  ],
  providers: [UserService],
  imports: [
    ConfigModule.forRoot(),
    
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    // copnfiguro el jwt
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SEED,
      signOptions: { expiresIn: '6h' },
    }),
  ],
  exports: [UserService],
})
export class UserModule {}
