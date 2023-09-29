import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-header-admin',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.scss']
})
export class HeaderAdminComponent implements OnDestroy {

  @Output() eventCloseModal= new EventEmitter<boolean>();

  constructor(){
    //
  }

  ngOnDestroy(): void {
    this.eventCloseModal.unsubscribe();
  }

  toggleCollapse(): void{
    this.eventCloseModal.emit();
  }
}
