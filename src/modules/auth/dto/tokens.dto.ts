import { ApiProperty } from '@nestjs/swagger';

export class TokensDto {
  @ApiProperty({
    type: String,
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI2ZGE0MGUzLTY4ODktNDkxNC04NjNkLTg0OTg4MGNiYzA5NCIsInBob25lIjoiKzM4MDQ5Mjc0Mzc0MiIsImlhdCI6MTY4MDM0NjU3MSwiZXhwIjoxNjgwNDMyOTcxfQ.zHV0_oWpQs00JjqcRD9jE_5_YaFv_2kvF2iGFujvFzY',
    description: 'access token',
  })
  accessToken: string;

  @ApiProperty({
    type: String,
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI2ZGE0MGUzLTY4ODktNDkxNC04NjNkLTg0OTg4MGNiYzA5NCIsInBob25lIjoiKzM4MDQ5Mjc0Mzc0MiIsImlhdCI6MTY4MDM0NjU3MSwiZXhwIjoxNjgwOTUxMzcxfQ.d0Eaace2jl9xKT4ZQeUf5v_47-3osipFd-NRISar2fo',
    description: 'refresh token',
  })
  refresh: string;
}
