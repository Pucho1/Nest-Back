import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from './entities/user.entity';

import * as bcryptjs from 'bcryptjs';
import { LoginUserDto } from './dto/login-user.dto';

import { JwtPayload } from './interfaces/jwt-paiload';
import { RegisterDto } from './dto/register.dto';
import { UserLogin } from './interfaces/user-login';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {};

  /**
   * Resumen del flujo

    Se recibe createUserDto con los datos del usuario.
    Se separa la contraseña del resto de los datos.
    Se encripta la contraseña con bcryptjs.
    Se crea un nuevo usuario con el modelo userModel.
    Se guarda en la base de datos con await createdUser.save().
    Se convierte el usuario en JSON y se elimina la contraseña antes de devolverlo.
    Se manejan errores si el usuario ya existe o si ocurre un problema inesperado.
   * @param createUserDto los datos recividos del front
   * @returns un usuario
   */
  async create(createUserDto: CreateUserDto): Promise<User> {

    // uso el try porque alguno de estos procesos puee lanzar un error 
    try {
      // eleimino  la contra del objeto resultante la separo en una variale independiente 
      const { password, ...userDta } = createUserDto;

      // paso los datos por el modelo para validarlos y encripto la contra para que se grave en BD
      const createdUser = new this.userModel({
        password: bcryptjs.hashSync(password, 10),
        ...userDta
      });

      // salvo el user en BD tiene que ser con el await sino el error no se controla
      await createdUser.save();

      const {password: _, ...user} = createdUser.toJSON();

      return user;

    } catch (error) {

      if( error.code === 11000 ) {
        throw new BadRequestException(`${ createUserDto.email } already exists!`)
      }
      throw new InternalServerErrorException('Something terribe happen!!!');
    };
  };

  async login(LoginUserDto: LoginUserDto): Promise<UserLogin>{
    const {password, email } = LoginUserDto;

    const haveUser = await this.userModel.findOne({ email })
    if( !haveUser ){
      throw new UnauthorizedException('error de autenticacion  --user invalid')
    };

    if( !bcryptjs.compareSync( password , haveUser.password) ){
      throw new UnauthorizedException('error de autenticacion  --pass invalid')
    };

    const { password: _, ...user} =haveUser.toJSON() 


    return {
      user,
      token: this.tokentPaiload( { id: user._id.toString() } ),
    };
  };

  async register(RegisterDto: RegisterDto): Promise<UserLogin>{

    const user = await this.create(RegisterDto);
    const token =  this.tokentPaiload( { id: user._id! } )

    return {
      user,
      token,
    };
  };


  findAll() {
    return this.userModel.find(); 
  };

  async findUserById(id: string){
    const user = await this.userModel.findById(id);

    // if (!user) {
    //   throw new BadRequestException('User not found');
    // }

    const { password, ...rest } = user!.toJSON();

    return rest;
  };



  findOne(id: number) {
    return `This action returns a #${id} auth`;
  };

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  };

  remove(id: number) {
    return `This action removes a #${id} auth`;
  };
/**
 * @param payload es el id del user
 * @returns un tokent valido para el usuario autenticado
 */
  tokentPaiload(payload: JwtPayload){
    const access_token= this.jwtService.sign(payload)
    return access_token;
  };
};
