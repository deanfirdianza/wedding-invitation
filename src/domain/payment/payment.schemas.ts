import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type PaymentDocument = Document & Payment;

@Schema()
export class Payment {
  @Prop({ required: true, unique: true })
  referralCode: string;

  @Prop({ type: Boolean, default: false })
  isPaid: boolean;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Invitation', required: true })
  invitation: MongooseSchema.Types.ObjectId; // Assuming the name of your Invitation model is 'Invitation'

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: MongooseSchema.Types.ObjectId; // Assuming the name of your Invitation model is 'User'
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
