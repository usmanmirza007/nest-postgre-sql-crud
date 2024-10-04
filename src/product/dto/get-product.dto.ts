import { ApiProperty } from '@nestjs/swagger';
import { Availibility } from "@prisma/client";

export class GetProductDto {
    @ApiProperty()
    id: number;

    @ApiProperty()

    name: string;

    @ApiProperty()
    price: number;

    @ApiProperty()
    sale?: boolean;

    @ApiProperty()
    availibility?: Availibility;

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
