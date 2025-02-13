import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth.service';
import { JwtPayload } from '../interfaces/jwt-paiload';

@Injectable()
export class AuthGuards implements CanActivate {

  constructor(
    private jwtService: JwtService,
    private authService:AuthService,
  ) {}

  async canActivate( context: ExecutionContext ): Promise<boolean> {

    //------> intercepto la peticion
    const request = context.switchToHttp().getRequest();

    //------> extraigo el token
    const token = this.extractTokenFromHeader(request);
 
    if (!token) {
      throw new UnauthorizedException();
    };

    try {
      // ---->  verfico qiue el token sea valido, envio el token y la llave de creacion
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: process.env.JWT_SEED,
      });

      // obtengo el usuario ue est haciendo la peicion 
      const user = await this.authService.findUserById(payload.id);

      if(!user) throw new  UnauthorizedException('Usuario no existe');
      if(!user.isActive) throw new  UnauthorizedException('Usuario no acrtivo');

      // se lo asigno a la response la cual tengo acceso a ella en el controlador 
      request['user'] = user;

      console.log(payload);

    } catch (error) { 
      throw new UnauthorizedException(); 
    };


    return true;
  };

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  };
};
