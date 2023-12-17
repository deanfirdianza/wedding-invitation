import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/domain/user/user.schemas';
import { UserRepositories } from '../user/user.repositories';
import { JwtService } from '@nestjs/jwt';
import { Invitation, InvitationSchema } from 'src/domain/invitation/invitation.schemas';
import { InvitationsController } from './invitation.controller';
import { InvitationsService } from './invitation.service';
import { InvitationRepository } from './invitation.repositories';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Invitation.name, schema: InvitationSchema }]),
  ],
  controllers: [InvitationsController],
  providers: [InvitationsService, InvitationRepository],
  exports: []
})

export class InvitationModule {}