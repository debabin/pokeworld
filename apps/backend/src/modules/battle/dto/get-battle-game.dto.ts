import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetBattleGameDto {
  @ApiProperty({
    description: 'Unique identifier for the battle game',
    example: '1a2b3c4d-5678-90ef-gh12-3456789ijklm',
    required: false
  })
  @IsString()
  battleId: string;
}
