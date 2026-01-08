import { HttpService } from "@nestjs/axios";
import { ApiAiResponseDto } from "./dto/api-ai-response.dto";
import { lastValueFrom } from "rxjs";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AiService {
    private readonly apiUrl: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly ConfigService: ConfigService
    ) {
        this.apiUrl = this.ConfigService.get<string>('AI_SERVICE_URL') ?? '';
    }

    async analyzeTaskContent(content: string): Promise<ApiAiResponseDto | null> {
        try {
            const response = await lastValueFrom(
                this.httpService.post(this.apiUrl, { description: content })
            );
            return response.data;
        } catch (error) {
            console.error('Error analyzing task content:', error);
            return null;
        }
    }
}