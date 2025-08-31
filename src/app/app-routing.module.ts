import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LitigeComponent } from './auth/litige/litige.component';
import { PieComponent } from './test/pie/pie.component';
import { EditComponent } from './crude/edit/edit.component';
import { DepartmentComponent } from './crude/department/department.component';
import { LineComponent } from './test/line/line.component';
import { ClientComponent } from './client/client.component';
import { User4Component } from './user4/user4.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { TableComponent } from './crude/table/table.component';
import { InvoiceComponent } from './edit/invoice/invoice.component';
import { AdminComponent } from './admin/admin.component';
import { ColumnComponent } from './test/column/column.component';
import { TabDispComponent } from './crude/tab-disp/tab-disp.component';
import { TolbarComponent } from './test/tolbar/tolbar.component';
import { DashboardComponent } from './crude/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  
    { path: 'dispute', loadComponent: () => import('./crude/dispute/dispute.component').then(m => m.DisputeComponent), canActivate: [AuthGuard] },
    { path: 'table', loadComponent: () => import('./crude/table/table.component').then(m => m.TableComponent) , canActivate: [AuthGuard]},
    { path: 'client', loadComponent: () => import('./client/client.component').then(m => m.ClientComponent), canActivate: [AuthGuard] },
    { path: 'admin', loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent), canActivate: [AuthGuard] },
    { path: 'dashboard', loadComponent: () => import('./crude/dashboard/dashboard.component').then(m => m.DashboardComponent), canActivate: [AuthGuard] },
    { path: 'user/:id', loadComponent: () => import('./user4/user4.component').then(m => m.User4Component), canActivate: [AuthGuard] },
    { path: 'tabdisp', loadComponent: () => import('./crude/tab-disp/tab-disp.component').then(m => m.TabDispComponent), canActivate: [AuthGuard] },
    { path: 'litige', component: LitigeComponent, canActivate: [AuthGuard] },
    { path: 'edit', component: EditComponent, canActivate: [AuthGuard] },
    { path: 'deprt', component: DepartmentComponent, canActivate: [AuthGuard] },
    { path: 'register', component: RegisterComponent},
    { path: 'login', component: LoginComponent },
    { path: 'edit/invoice', component: InvoiceComponent, canActivate: [AuthGuard] },
    { path: 'test', component: TolbarComponent, canActivate: [AuthGuard] },
   //{path:'**', redirectTo: 'login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
