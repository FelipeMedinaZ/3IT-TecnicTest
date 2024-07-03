import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, throwError } from 'rxjs';

import { APP_CONFIG } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  headers: HttpHeaders = new HttpHeaders({
    Accept: 'application/json',
  });

  constructor(
    private httpClient: HttpClient
  ) {}

  async getService(indicador: string): Promise<any> {
    const url = `${APP_CONFIG.API.url}/${indicador}?apikey=${APP_CONFIG.API.apikey}&formato=json`;
    try {
      return await lastValueFrom(this.httpClient.get(url, {headers: this.headers}));
    } catch (error: any) {
      throw error
    }
  }

  async getServiceRangoFechas(indicador: string, year1: number, month1: number, dias1: number, year2: number, month2: number, dias2: number): Promise<any> {
    const url = `${APP_CONFIG.API.url}/${indicador}/periodo/${year1}/${month1}/dias_i/${dias1}/${year2}/${month2}/dias_f/${dias2}?apikey=${APP_CONFIG.API.apikey}&formato=json`;
    try {
      return await lastValueFrom(this.httpClient.get(url, {headers: this.headers}));
    } catch (error: any) {
      throw error
    }
  }

  async getRangoFechasUfIpc(indicador: string, year1: number, month1: number, year2: number, month2: number ): Promise<any> {
    const url = `${APP_CONFIG.API.url}/${indicador}/periodo/${year1}/${month1}/${year2}/${month2}?apikey=${APP_CONFIG.API.apikey}&formato=json`;
    try {
      return await lastValueFrom(this.httpClient.get(url, {headers: this.headers}));
    } catch (error: any) {
      throw error
    }
  }

  async getServiceAñoActual(indicador: string, year: number): Promise<any> {
      const url = `${APP_CONFIG.API.url}/${indicador}/${year}?apikey=${APP_CONFIG.API.apikey}&formato=json`;
      try {
        return await lastValueFrom(this.httpClient.get(url, {headers: this.headers}));
      } catch (error: any) {
        throw error
      }
    }
  }
