import { ConfigServerService } from "./config/config-server.service";

export class APIBase {
    authToken = '';
    base_url = '';
    protected constructor(config: ConfigServerService) {
        this.authToken = "QUAN-LI-APP";
        this.base_url = config.BASE_URL_SERVER;
    }

    setAuthToken(text: string) {
        this.authToken = text;
    }

    public getBaseUrl(text: string) {
        return this.base_url;
    }

    protected transformOptions(options: any): Promise<any> {
        try {
            const token = sessionStorage.getItem("TOKEN") ?? "";
            options.headers = options.headers.append('Authorization', `${this.authToken}`);
            options.headers = options.headers.append('Token', token);
        } catch {   
            console.log(`transformOptions ERROR`)
        }
        return Promise.resolve(options);
    }
}