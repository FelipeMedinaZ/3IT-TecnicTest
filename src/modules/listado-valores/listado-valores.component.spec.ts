import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoValoresComponent } from './listado-valores.component';

describe('ListadoValoresComponent', () => {
  let component: ListadoValoresComponent;
  let fixture: ComponentFixture<ListadoValoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoValoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListadoValoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
