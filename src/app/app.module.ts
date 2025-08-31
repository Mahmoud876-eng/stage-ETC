import { MatListModule } from '@angular/material/list';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HttpClientModule } from '@angular/common/http';
import { AsyncPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DisputeComponent } from './crude/dispute/dispute.component';
import { LitigeComponent } from './auth/litige/litige.component';
import { PieComponent } from './test/pie/pie.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBadgeModule } from '@angular/material/badge';
import { EditComponent } from './crude/edit/edit.component';
import { DepartmentComponent } from './crude/department/department.component';
import { LineComponent } from './test/line/line.component';
import { ClientComponent } from './client/client.component';
import { User4Component } from './user4/user4.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { TableComponent } from './crude/table/table.component';
import { InvoiceComponent } from './edit/invoice/invoice.component';
import { AdminComponent } from './admin/admin.component';
import { ColumnComponent } from './test/column/column.component';
import { MatNativeDateModule } from '@angular/material/core';
import { TabDispComponent } from './crude/tab-disp/tab-disp.component';
import { TabdispComponent } from './crude/tabdisp/tabdisp.component';
import { TolbarComponent } from './test/tolbar/tolbar.component';
import { DialogElementsExampleDialog } from './test/tolbar/tolbar.component';
import { DashboardComponent } from './crude/dashboard/dashboard.component';




@NgModule({
  declarations: [
    AppComponent,
    EditComponent,
    DepartmentComponent,
    LoginComponent,
    RegisterComponent,
    InvoiceComponent,
    TabdispComponent,
    TolbarComponent,
    DialogElementsExampleDialog,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    AsyncPipe,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    NgApexchartsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatDialogModule,
    MatBadgeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
