import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  headers: HttpHeaders = new HttpHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8'
  });

  constructor(
    private httpClient: HttpClient
  ) {}
  
  async getIndicators(): Promise<any> {
    const url = "";

    try {
      return await lastValueFrom(this.httpClient.get(url, {headers: this.headers}));
    } catch (error: any) { throw error };
  }

}
