import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

export class ApiResponseDto<T> {
    @ApiProperty({ example: true, description: 'Indicates if the operation was successful' })
    success: boolean;

    @ApiProperty({ example: 'Operation completed successfully', description: 'A message describing the result of the operation', required: false })
    message?: string;
    
    @ApiProperty({ description: 'The data returned by the operation', required: false })
    data?: T;
}