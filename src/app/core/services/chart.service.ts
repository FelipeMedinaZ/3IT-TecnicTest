import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {

  constructor() {}

  transformData(rawData: any[], item: string, medicion: string): any {
    const transformedData: any = {
      labels: [],
      datasets: []
    };

    // Ordenar datos por fecha
    rawData.sort((a, b) => new Date(a.Fecha).getTime() - new Date(b.Fecha).getTime());

    // Crear un dataset para el item específico
    const dataset: any = {
      label: `Evolución ${medicion}`,
      data: [],
      fill: false,
      borderColor: this.getColorByItem(item),
      tension: 0.4
    };

    // Llenar datos del dataset
    rawData.forEach((measurement: any) => {
      const fecha = new Date(measurement.Fecha).toLocaleDateString();
      const valor = parseFloat(measurement.Valor.replace(',', '.')); // Convertir el valor de texto a número

      transformedData.labels.push(fecha);
      dataset.data.push(valor);
    });

    // Agregar el dataset al array de datasets en el objeto transformedData
    transformedData.datasets.push(dataset);

    return transformedData;
  }

  private getColorByItem(item: string): string {
    // Implementar lógica para definir colores según el tipo de dispositivo
    switch (item) {
      case 'Dolares':
        return '#63a88b'; // Color para Dolares
      case 'Euros':
        return '#e0ae6e'; // Color para Euros
      case 'IPCs':
        return '#8a0f06'; // Color para IPCs
      case 'UFs':
        return '#2a5679'; // Color para UFs
      case 'UTMs':
        return '#b35b1f'; // Color para UTMs
      default:
        return '#000000'; // Color predeterminado
    }
  }
}
