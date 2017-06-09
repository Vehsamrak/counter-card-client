import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';

@Injectable()
export class HttpClient {
    private currentTokenStorageKey = 'currentToken';

    constructor(private http: Http) {
    }

    public get(url: string): Observable<Response> {
        const options = this.createOptions();

        return this.http.get(url, options);
    }

    public post(url: string, data: object): Observable<Response> {
        const options = this.createOptions();

        return this.http.post(url, data, options);
    }

    createAuthorizationHeader(headers: Headers) {
        headers.append('AUTH-TOKEN', localStorage.getItem(this.currentTokenStorageKey));
    }

    private createOptions(): RequestOptions {
        const options = new RequestOptions();
        const headers = new Headers();
        this.createAuthorizationHeader(headers);
        options.headers = headers;

        return options;
    }
}
