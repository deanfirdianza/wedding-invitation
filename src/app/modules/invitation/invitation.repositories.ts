import { Model, ModifyResult } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateInvitationDto, IUpdateInvitation, UpdateInvitationDto } from './dto/invitation.dto';
import { Invitation, InvitationDocument } from 'src/domain/invitation/invitation.schemas';

@Injectable()
export class InvitationRepository {
  constructor(
    @InjectModel(Invitation.name) private readonly invitationModel: Model<Invitation>,
  ) {}

  findAll(): Promise<Invitation[]> {
    return this.invitationModel.find().exec();
  }

  findById(uid: string): Promise<Invitation|null> {
    return this.invitationModel.findById(uid).exec();
  }

  create(createInvitationDto: CreateInvitationDto): Promise<Invitation> {
    const createdInvitation = new this.invitationModel(createInvitationDto);
    return createdInvitation.save();
  }

  update(uid: string, updateInvitationDto: IUpdateInvitation): Promise<Invitation|null> {
    return this.invitationModel.findByIdAndUpdate(uid, updateInvitationDto, { new: true }).exec();
  }

  delete(uid: string): Promise<ModifyResult<InvitationDocument>> {
    return this.invitationModel.findByIdAndDelete({ _id: uid }).exec();
  }
}
