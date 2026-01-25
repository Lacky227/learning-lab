import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateTaskDto {
  @ApiProperty({
    example: 'Finish Swagger docs',
    description: 'Short task title',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    example: 'Add documentation for Tasks module',
    description: 'Detailed task description',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
