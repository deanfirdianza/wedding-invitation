import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type InvitationDocument = HydratedDocument<Invitation>;

@Schema()
export class BrideDetail {
  @Prop()
  brideName: string;

  @Prop()
  groomName: string;

  @Prop()
  venue: string;

  // Add any other creative fields you want
}

@Schema()
export class Invitation {
  @Prop()
  date: Date;

  @Prop()
  venue: string;

  @Prop()
  message: string;

  @Prop({ enum: ['Draft', 'Completed'], default: 'Draft' })
  status: string;

  @Prop({ type: BrideDetail, required: true })
  brideDetail: BrideDetail;

  @Prop({ type: Boolean, default: false })
  isPublished: boolean;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: MongooseSchema.Types.ObjectId; // Assuming the name of your Invitation model is 'User'
}

export const BrideDetailSchema = SchemaFactory.createForClass(BrideDetail);
export const InvitationSchema = SchemaFactory.createForClass(Invitation);
