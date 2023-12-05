import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { LoginComponent } from './Components/login/login.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { IndexPageComponent } from './Components/index-page/index-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupService } from './services/signup.service';
import { AboutComponent } from './Components/about/about.component';
import { ContactusComponent } from './Components/contactus/contactus.component';
import { FaqsComponent } from './Components/faqs/faqs.component';
import { FooterComponent } from './Components/footer/footer.component';
import { PricingComponent } from './Components/pricing/pricing.component';
import { DashboardheaderComponent } from './Components/dashboardheader/dashboardheader.component';
import { DashboardfooterComponent } from './Components/dashboardfooter/dashboardfooter.component';

import { QuestionpaperComponent } from './Components/dashboard/welcome-instruction/questionpaper/questionpaper.component';
import { ChangeBgDirective } from './change-bg.directive';
import { WelcomeInstructionComponent } from './Components/dashboard/welcome-instruction/welcome-instruction.component';
import { AdminComponent } from './Components/admin/admin.component';
import { AdmindashboardComponent } from './Components/admin/admindashboard/admindashboard.component';
import { AdminheaderComponent } from './Components/admin/adminheader/adminheader.component';
import { AdminfooterComponent } from './Components/admin/adminfooter/adminfooter.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { ResultsComponent } from './Components/results/results.component';
import { ProfileComponent } from './Components/profile/profile.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignUpComponent,
    DashboardComponent,
    IndexPageComponent,
    FooterComponent,
    ContactusComponent,
    FaqsComponent,
    PricingComponent,
    AboutComponent,
    DashboardheaderComponent,

    DashboardfooterComponent,
    QuestionpaperComponent,
    ChangeBgDirective,
    WelcomeInstructionComponent,
    AdminComponent,
    AdmindashboardComponent,
    AdminheaderComponent,
    AdminfooterComponent,

    PageNotFoundComponent,
    ResultsComponent,
    ProfileComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [SignupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
