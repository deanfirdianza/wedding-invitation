import { IsNotEmpty, IsString } from "class-validator";

export class BrideDetailDto {
    @IsString()
    @IsNotEmpty()
    brideName: string;

    @IsString()
    @IsNotEmpty()
    groomName: string;
}

export class BrideUpdateDto {
    @IsString({ message: 'Invalid brideName format' })
    brideName?: string;

    @IsString({ message: 'Invalid groomName format' })
    groomName?: string;
}
