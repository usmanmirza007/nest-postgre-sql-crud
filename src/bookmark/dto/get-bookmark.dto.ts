import { GetUserDto } from "src/user/dto"

import { ApiProperty } from '@nestjs/swagger';

export class GetBookmarkDto {
  @ApiProperty({
    description: 'Unique identifier for the bookmark',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Title of the bookmark',
    example: 'NestJS Documentation',
  })
  title: string;

  @ApiProperty({
    description: 'URL of the bookmark',
    example: 'https://nestjs.com',
  })
  link: string;

  @ApiProperty({
    description: 'Description of the bookmark',
    example: 'NestJS is a progressive Node.js framework for building server-side applications.',
  })
  description?: string;

  @ApiProperty({
    description: 'Date and time when the bookmark was created',
    example: '2024-01-01T12:00:00Z',
  })
  createdAt: string;

  @ApiProperty({
    description: 'Date and time when the bookmark was last updated',
    example: '2024-01-15T12:00:00Z',
  })
  updatedAt?: string;
}
