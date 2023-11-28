import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{ LoginComponent } from './Components/login/login.component'
import{ SignUpComponent } from './Components/sign-up/sign-up.component'
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { IndexPageComponent } from './Components/index-page/index-page.component';
import { ContactusComponent } from './Components/contactus/contactus.component';
import { AboutComponent } from './Components/about/about.component';
import { FaqsComponent } from './Components/faqs/faqs.component';
import { PricingComponent } from './Components/pricing/pricing.component';

import { QuestionpaperComponent } from './Components/dashboard/welcome-instruction/questionpaper/questionpaper.component';
import { WelcomeInstructionComponent } from './Components/dashboard/welcome-instruction/welcome-instruction.component';



const routes: Routes = [
  { path: 'home', component: IndexPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'dashboard/:studentId', component: DashboardComponent },
  { path: 'contact', component: ContactusComponent },
  { path: 'price', component: PricingComponent },
  { path: 'faqs', component: FaqsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'welcome', component: WelcomeInstructionComponent },
 
  { path: 'questionPaper', component: QuestionpaperComponent },

  // Add more routes as needed
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect to signup by default

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
