import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ModifyResult } from 'mongoose';
import { Invitation, InvitationDocument } from 'src/domain/invitation/invitation.schemas';
import { CreateInvitationDto, UpdateInvitationDto, UpdatePublishDto, UpdateStatusDto } from './dto/invitation.dto';
import { InvitationRepository } from './invitation.repositories';

@Injectable()
export class InvitationsService {
  constructor(
    private readonly invitationRepository: InvitationRepository
  ) {}

  async getAllInvitations(): Promise<Invitation[]> {
    return this.invitationRepository.findAll()
  }

  async createInvitation(createInvitationDto: CreateInvitationDto): Promise<Invitation> {
    const createdInvitation = await this.invitationRepository.create(createInvitationDto)
    return createdInvitation;
  }

  async getInvitationDetail(uid: string): Promise<Invitation> {
    const invitation = await this.invitationRepository.findById(uid)
    if (!invitation) {
      throw new NotFoundException('Invitation not found');
    }
    return invitation;
  }

  async editInvitation(uid: string, updateInvitationDto: UpdateInvitationDto): Promise<Invitation> {
    const invitation = await this.invitationRepository.update(uid, updateInvitationDto)
    if (!invitation) {
      throw new NotFoundException('Invitation not found');
    }

    return invitation;
  }

  async deleteInvitation(uid: string): Promise<ModifyResult<InvitationDocument>> {
    const result = await this.invitationRepository.delete(uid)
    if (result.ok) {
      throw new NotFoundException('Invitation not found');
    }
    return result;
  }

  async saveInvitationToDraft(uid: string, updateStatusDto: UpdateStatusDto): Promise<Invitation> {
    const invitation = await this.invitationRepository.update(uid, updateStatusDto)
    if (!invitation) {
        throw new NotFoundException('Invitation not found');
      }
  
    return invitation;
  }

  async publishInvitation(uid: string, updatePublishDto: UpdatePublishDto): Promise<Invitation> {
    const invitation = await this.invitationRepository.update(uid, updatePublishDto)
    if (!invitation) {
        throw new NotFoundException('Invitation not found');
      }
  
    return invitation;
  }
}
