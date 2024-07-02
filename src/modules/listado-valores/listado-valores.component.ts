import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listado-valores',
  standalone: true,
  imports: [],
  templateUrl: './listado-valores.component.html',
  styleUrl: './listado-valores.component.scss'
})
export class ListadoValoresComponent implements OnInit{
  @Output() item = new EventEmitter<string>();

  constructor(
    private activatedRoute: ActivatedRoute
  ){}


  ngOnInit(): void {
    this.getParams()
  }


  getParams(){
    const queryParams = this.activatedRoute.snapshot.queryParams;

    if (queryParams) {
      //hay queryParams
      console.log("A VER: ", queryParams);
      
      
    }
  
  }
}
