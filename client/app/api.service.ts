import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

@Injectable()
export class ApiService {
    // We have different headers for post and get. For post, we are sending
    // content and need a "content-type" header
    private postHeaders: Headers = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    });

    // GET requests do not send any content, and just accept the JSON returned
    private getHeaders: Headers = new Headers({
        'Accept': 'application/json'
    });

    // This is the url of our server. We'll need to update this if our server
    // moves
    private url: string = 'http://localhost:3002';

    // An empty constructor, but we inject the Http provider into our class here
    constructor(private http: Http) { }

    // A helper function which returns an object version of the response JSON
    private getJSON(response: Response) {
        return response.json();
    }

    // A helper function which checks if our response was actually an error,
    // and throws an error in that case. We could leverage this function to
    // show a nice error message to the user instead.
    private checkForError(response: Response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            let error = new Error(response.statusText);
            error['response'] = response;
            throw error;
        }
    }

    // Perform a GET request to the server on path `path`.
    // IMPORTANT: This function actually returns an Observable object. This
    // Observable doesn't do anything until we subscribe to it, at which point
    // it performs the action and calls any attached callback functions.
    getObs(path: string, jwt?: string): Observable<any> {
        let opts = {
            headers: this.getHeaders
        };
        if (jwt) {
            opts.headers.delete('Authorization');
            opts.headers.append('Authorization', 'JWT ' + jwt);
        }

        return this.http.get(
            this.url + path,
            opts
        )
        // check the observable response for errors
        .map(this.checkForError)
        // if there is an error, throw that error
        .catch((err) => Observable.throw(err))
        // otherwise, return an object representation of the returned JSON
        .map(this.getJSON);
    }

    // See get() for details - this is the same, but performs a POST with a body
    postObs(path: string, data: any, jwt?: string): Observable<any> {
        let opts = {
            headers: this.postHeaders
        };

        if (jwt) {
            opts.headers.delete('Authorization');
            opts.headers.append('Authorization', 'JWT ' + jwt);
        }

        return this.http.post(
            this.url + path,
            data,
            opts
        )
        .map(this.checkForError)
        .catch((err) => Observable.throw(err))
        .map(this.getJSON);
    }

}
