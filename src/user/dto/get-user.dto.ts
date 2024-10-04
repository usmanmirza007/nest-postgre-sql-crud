import { ApiProperty } from "@nestjs/swagger"
import { GetBookmarkDto } from "src/bookmark/dto"

export class GetUserDto {
    @ApiProperty()
    id: number

    @ApiProperty()
    email: string

    @ApiProperty()
    firstName: string

    @ApiProperty()
    lastName: string

    @ApiProperty()
    picture: string

    @ApiProperty()
    createdAt: string

    @ApiProperty()
    updatedAt: string
    
    @ApiProperty({
        type: GetBookmarkDto
    })
    Bookmark: GetBookmarkDto[]
}