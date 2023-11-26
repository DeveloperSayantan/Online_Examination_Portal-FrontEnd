import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{ LoginComponent } from './Components/login/login.component'
import{ SignUpComponent } from './Components/sign-up/sign-up.component'
import { DashboardComponent } from './Components/dashboard/dashboard.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent },
  // Add more routes as needed
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to signup by default

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
