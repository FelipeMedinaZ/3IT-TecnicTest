import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//modules
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from '../../core/services/http.service';
import { CommunicationService } from '../../core/services/comunication.service';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [
    NgFor,
    NgxSpinnerModule,
    CommonModule
  ],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.scss'
})
export class DetalleComponent implements OnInit{
  //fecha de hoy
  currentDate = new Date();

  currentItem!: any; //item que llega por parametros

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private httpService: HttpService,
    private spinner: NgxSpinnerService,
    private communicationService: CommunicationService
  ){}

  ngOnInit(): void {
    this.getParams()
  }


  async getParams(){
    const queryParams = this.activatedRoute.snapshot.queryParams;

    if (queryParams) {
      //hay queryParams
      console.log("A VER: ", queryParams);
      this.currentItem = queryParams;
      this.communicationService.changeMessage(this.currentItem.Nombre);

      await this.getInfo();
    }
  }


  async getInfo(){
    this.spinner.show();
  }
}
