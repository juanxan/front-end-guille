import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import { PedidosReadComponent } from 'src/app/shared/components/pedidos/pedidos-read/pedidos-read.component';
import { PedidosCreateComponent } from 'src/app/shared/components/pedidos/pedidos-create/pedidos-create.component';
@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    PedidosReadComponent,
    PedidosCreateComponent
  ],
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent {

}
