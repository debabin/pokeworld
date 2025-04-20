import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateBattleGameDto {
  @ApiProperty({
    description: 'Name of the battle game',
    example: 'Pokemon Battle',
    required: true
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Password for the battle game (optional)',
    example: '1234',
    required: false
  })
  @IsString()
  @IsOptional()
  password: string | null;

  @ApiProperty({
    description: 'Flag to allow spectators in the battle game',
    example: true,
    required: true
  })
  @IsBoolean()
  spectate: boolean;
}
