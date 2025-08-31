import { Component } from '@angular/core';
import { PieComponent } from '../test/pie/pie.component';
import { TableComponent } from '../crude/table/table.component';
import { ColumnComponent } from '../test/column/column.component';
import { LineComponent } from '../test/line/line.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  standalone: true,
  imports: [PieComponent, TableComponent, ColumnComponent, LineComponent],
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

}
