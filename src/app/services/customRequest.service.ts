import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  constructor(private http: HttpClient) {}
  private host: string = environment.apiHost;

  request(method: 'GET' | 'POST', url: string, data?: any): Observable<any> {
    if (method === 'GET') {
      const params = new HttpParams({ fromObject: data });
      return this.http.get(`${this.host}${url}`, { params });
    } else if (method === 'POST') {
      return this.http.post(`${this.host}${url}`, data);
    } else {
      throw new Error(`Unsupported request method: ${method}`);
    }
  }

  get(url: string, params?: any): Observable<any> {
    return this.request('GET', url, params);
  }

  post(url: string, data?: any): Observable<any> {
    return this.request('POST', url, data);
  }
}
