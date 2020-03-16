
import { HttpClient, IHttpClientOptions, HttpClientConfiguration } from "@microsoft/sp-http";
import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";

export interface CognitiveServiceConfiguration {
    context: ApplicationCustomizerContext;
}

export class CognitiveService {
    private context: ApplicationCustomizerContext;
    private qnamakerEnpoint: string = "https://sharepointdoubts.azurewebsites.net";
    private qnamakerEndpointKey: string = "Update your End point here";
    private knowledgebaseId: string = "Update your KB ID";

    constructor(config: CognitiveServiceConfiguration) {
        this.context = config.context;
    }

    public async getQnaAnswer(userQuery: string): Promise<String> {
        let answer: string = 'Could not find the answer to your question... sorry!';
        // Build URI
        const postURL = this.qnamakerEnpoint + `/qnamaker/knowledgebases/${this.knowledgebaseId}/generateAnswer`;

        // Build body
        const body: string = JSON.stringify({
            'question': userQuery
        });

        // Build headers
        const requestHeaders: Headers = new Headers();
        requestHeaders.append('Content-type', 'application/json');
        requestHeaders.append('Authorization', this.qnamakerEndpointKey);

        const httpClientOptions: IHttpClientOptions = {
            body: body,
            headers: requestHeaders
        };

        let response = await this.context.httpClient.post(
            postURL,
            HttpClient.configurations.v1,
            httpClientOptions
        );

        if (response.ok) {
            let json = await response.json();
            if (json.answers[0].answer != 'No good match found in the KB')
                answer = json.answers[0].answer;
        }
        return answer;
    }
}