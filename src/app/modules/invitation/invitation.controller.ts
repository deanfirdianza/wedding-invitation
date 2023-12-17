import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { InvitationsService } from './invitation.service';
import { CreateInvitationDto, UpdateInvitationDto, UpdatePublishDto, UpdateStatusDto } from './dto/invitation.dto';


@Controller('invitations')
export class InvitationsController {
  constructor(private readonly invitationsService: InvitationsService) {}

  @Get()
  getAllInvitations() {
    return this.invitationsService.getAllInvitations();
  }

  @Post()
  createInvitation(@Body() createInvitationDto: CreateInvitationDto) {
    return this.invitationsService.createInvitation(createInvitationDto);
  }

  @Get(':uid')
  getInvitationDetail(@Param('uid') uid: string) {
    return this.invitationsService.getInvitationDetail(uid);
  }

  @Patch(':uid')
  editInvitation(@Param('uid') uid: string, @Body() updateInvitationDto: UpdateInvitationDto) {
    return this.invitationsService.editInvitation(uid, updateInvitationDto);
  }

  @Delete(':uid')
  deleteInvitation(@Param('uid') uid: string) {
    return this.invitationsService.deleteInvitation(uid);
  }

  @Post(':uid/save')
  saveInvitationToDraft(@Param('uid') uid: string, @Body() updateStatusDto: UpdateStatusDto) {
    return this.invitationsService.saveInvitationToDraft(uid, updateStatusDto);
  }

  @Post(':uid/publish')
  publishInvitation(@Param('uid') uid: string, @Body() updatePublishDto: UpdatePublishDto) {
    return this.invitationsService.publishInvitation(uid, updatePublishDto);
  }
}
