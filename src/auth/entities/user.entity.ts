import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {
	/**
	 * Creo el (modelo o esquema) con sus restriciones pertinentes
	 */

	_id?: string;
	
	@Prop({required: true})
	name: string;

	@Prop({required: true, unique: true})
	email: string;

	@Prop({required: true, minlength: 6})
	password?: string;

	@Prop({default: true})
	isActive: boolean;

	@Prop({type: [String], default: ['user']})
	roles: string[];

};

/**
 * Creo el esquema de la base de datos le indico que es de tipo User
 */
export const UserSchema = SchemaFactory.createForClass( User );
