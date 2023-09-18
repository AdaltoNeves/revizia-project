import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {path: 'vehicle',component: VehicleComponent },
  {path: 'dashboard',component: DashboardComponent }

];

@NgModule(
  {
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],


}
)
export class AppRoutingModule { }
