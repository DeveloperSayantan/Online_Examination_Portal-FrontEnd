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
import { FormsModule } from '@angular/forms';

import { SignupService } from './services/signup.service'; // Adjust the path based on your actual file structure
import { FooterComponent } from './Components/footer/footer.component';
import { ContactusComponent } from './Components/contactus/contactus.component';
import { PricingComponent } from './Components/pricing/pricing.component';
import { FaqsComponent } from './Components/faqs/faqs.component';
import { AboutComponent } from './Components/about/about.component';

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
    PricingComponent,
    FaqsComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [SignupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
