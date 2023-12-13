import { Injectable } from "@angular/core";

@Injectable()
export class APIBase {
    authToken = '';
    protected constructor() {
        this.authToken = "QUAN-LI-APP";
    }
    setAuthToken(text: string) {
        this.authToken = text;
    }

    public getBaseUrl(text: string) {
        return "";
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