import { Type } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsString, IsEnum, IsBoolean, IsMongoId, IsDefined, IsNotEmptyObject, IsObject, ValidateNested, IsOptional } from 'class-validator';
import { BrideDetailDto, BrideUpdateDto } from './bride.dto';

export interface IUpdateInvitation {
    date?: Date;
    venue?: string;
    message?: string;
    status?: string;
    isPublished?: boolean;
    brideDetail?: {
      brideName?: string;
      groomName?: string;
      venue?: string;
      // Add any other creative fields you want
    };
    user?: string;
  }

export class CreateInvitationDto {
  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsNotEmpty()
  venue: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsEnum(['Draft', 'Completed'])
  status: string;

  @IsBoolean()
  isPublished: boolean;

  @IsMongoId()
  @IsNotEmpty()
  user: string; // Assuming the name of your Invitation model is 'User'

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => BrideDetailDto)
  name!: BrideDetailDto;
}

export class UpdateInvitationDto {
  @IsDateString({strict: false}, { message: 'Invalid date format' })
  @IsNotEmpty({ message: 'Date is required' })
  @IsOptional()
  date?: Date;

  @IsString({ message: 'Invalid venue format' })
  @IsNotEmpty({ message: 'Venue is required' })
  @IsOptional()
  venue?: string;

  @IsString({ message: 'Invalid message format' })
  @IsNotEmpty({ message: 'Message is required' })
  @IsOptional()
  message?: string;

  @IsEnum(['Draft', 'Completed'], { message: 'Invalid status' })
  @IsOptional()
  status?: string;

  @IsBoolean({ message: 'Invalid isPublished format' })
  @IsOptional()
  isPublished?: boolean;

    @IsNotEmpty({ message: 'Bride detail is required' })
    @IsOptional()
    @Type(() => BrideUpdateDto)
    name!: BrideUpdateDto;

  @IsMongoId({ message: 'Invalid user format' })
  @IsOptional()
  user?: string; // Assuming the name of your Invitation model is 'User'
}

export class UpdatePublishDto {
    @IsBoolean({ message: 'Invalid isPublished format' })
    isPublished?: boolean;
}

export class UpdateStatusDto {
    @IsEnum(['Draft', 'Completed'])
    status: string;
}

