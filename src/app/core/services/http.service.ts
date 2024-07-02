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
    console.log("URL A CONSUMIR: ", url);
    try {
      return await lastValueFrom(this.httpClient.get(url, {headers: this.headers}));
    } catch (error: any) {
      throw error
    }
  }


  //ejemplo url: https://api.cmfchile.cl/api-sbifv3/recursos_api/dolar?apikey=blablabla&formato=json


  async getServiceRangoFechas(indicador: string, year1: number, month1: number, dias1: number, year2: number, month2: number, dias2: number): Promise<any> {
    const url = `${APP_CONFIG.API.url}/${indicador}/periodo/${year1}/${month1}/dias_i/${dias1}/${year2}/${month2}/dias_f/${dias2}?apikey=${APP_CONFIG.API.apikey}&formato=json`;
    console.log("URL A CONSUMIR: ", url);
    try {
      return await lastValueFrom(this.httpClient.get(url, {headers: this.headers}));
    } catch (error: any) {
      throw error
    }
  }

  // async getServiceRangoFechas(): Promise<any> {
  //   const url = "https://api.cmfchile.cl/api-sbifv3/recursos_api/dolar/periodo/2010/01/dias_i/04/2010/01/dias_f/05?apikey=bf6b491ec46caf655a1204c927f559580679f4c4&formato=json";
  //   console.log("URL A CONSUMIR: ", url);
  //   try {
  //     return await lastValueFrom(this.httpClient.get(url, {headers: this.headers}));
  //   } catch (error: any) {
  //     throw error
  //   }
  // }



  async getServiceAñoActual(indicador: string, year: number): Promise<any> {
    // EJEMPLO URL:
    // https://api.cmfchile.cl/api-sbifv3/recursos_api/utm/2010?apikey=SBIF9990SBIF44b7SBIF7f4c5a537d02358e1099&formato=xml
      const url = `${APP_CONFIG.API.url}/${indicador}/${year}?apikey=${APP_CONFIG.API.apikey}&formato=json`;
      console.log("URL A CONSUMIR: ", url);
      try {
        return await lastValueFrom(this.httpClient.get(url, {headers: this.headers}));
      } catch (error: any) {
        throw error
      }
    }
  }
