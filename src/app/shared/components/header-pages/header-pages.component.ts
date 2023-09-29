import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import { PagesComponent } from 'src/app/pages/pages.component';

@Component({
  selector: 'app-header-pages',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule
  ],
  templateUrl: './header-pages.component.html',
  styleUrls: ['./header-pages.component.scss']
})
export class HeaderPagesComponent {
  @Output() eventCloseModal= new EventEmitter<boolean>();
  
  cantidad: number;

  constructor(
    private readonly pagesComponent: PagesComponent
  ){
    this.cantidad = this.pagesComponent.productos.length;
  }

  ngOnDestroy(): void {
    this.eventCloseModal.unsubscribe();
  }

  toggleCollapse(): void{
    this.eventCloseModal.emit();
  }
}
