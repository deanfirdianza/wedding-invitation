import { Type } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop({required:true, unique: true})
  username: string;

  @Prop({type: String, trim: true, minlength: 6})
  hash: string;

  @Prop({required:true, unique: true})
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
