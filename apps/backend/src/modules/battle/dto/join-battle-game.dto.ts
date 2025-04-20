import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class JoinBattleGameDto {
  @ApiProperty({
    description: 'Unique identifier for the battle game',
    example: '1a2b3c4d-5678-90ef-gh12-3456789ijklm',
    required: true
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'Password for the battle game (if required)',
    example: '1234',
    required: false
  })
  @IsString()
  @IsOptional()
  password: string | null;
}
