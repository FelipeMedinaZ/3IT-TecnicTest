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
      const valor = parseFloat(measurement.Valor.replace(',', '.'));

      transformedData.labels.push(fecha);
      dataset.data.push(valor);
    });

    // Agregar el dataset al array de datasets en el objeto transformedData
    transformedData.datasets.push(dataset);

    return transformedData;
  }

  private getColorByItem(item: string): string {
    switch (item) {
      case 'Dolares':
        return '#63a88b';
      case 'Euros':
        return '#e0ae6e';
      case 'IPCs':
        return '#8a0f06';
      case 'UFs':
        return '#2a5679';
      case 'UTMs':
        return '#b35b1f';
      default:
        return '#000000';
    }
  }
}
