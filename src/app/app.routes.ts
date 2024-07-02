import { Routes } from '@angular/router';

//components
import { IndicadoresComponent } from '../modules/indicadores/indicadores.component';
import { ListadoValoresComponent } from '../modules/listado-valores/listado-valores.component';
import { DetalleComponent } from '../modules/detalle/detalle.component';

export const routes: Routes = [
    { path: '', redirectTo: 'indicadores', pathMatch: 'full' },
    { path: 'indicadores', component: IndicadoresComponent },
    { path: 'listado-valores', component: ListadoValoresComponent },
    { path: 'detalle', component: DetalleComponent },
    { path: '**', redirectTo: 'indicadores', pathMatch: 'full'} //para redirigir a la ruta principal en caso de escribir una url cualquiera
];
