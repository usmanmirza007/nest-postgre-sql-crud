import { ApiProperty } from "@nestjs/swagger"
import { Availibility } from "@prisma/client"
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateProductDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    price: number

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    sale: boolean

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(Availibility, { message: 'Availability must be IN_STORE or ONLINE' }) 
    availibility: Availibility
}