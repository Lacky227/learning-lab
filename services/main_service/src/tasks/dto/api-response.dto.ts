export class ApiResponseDto<T> {
    success: boolean;
    message: string;
    data?: T;

    constructor(success: boolean, message: string, data?: T) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    static success<T>(message: string, data?: T): ApiResponseDto<T> {
        return new ApiResponseDto<T>(true, message, data);
    }

    static failure<T>(message: string, data?: T): ApiResponseDto<T> {
        return new ApiResponseDto<T>(false, message, data);
    }
}