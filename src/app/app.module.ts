import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HotToastModule } from '@ngneat/hot-toast';

import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { initializeAppCheck, provideAppCheck, ReCaptchaV3Provider } from '@angular/fire/app-check';
import { getAuth, provideAuth } from '@angular/fire/auth';

import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { SharedModule } from './shared/shared.module';
import { AddDataComponent } from './add-data/add-data.component';
import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component';
import { TutorialDetailsComponent } from './components/tutorial-details/tutorial-details.component';
import { TutorialsListComponent } from './components/tutorials-list/tutorials-list.component';
import { AppRouterModule } from './app.router.module';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { MatTableResponsiveDirective } from './mat-table-responsive/mat-table-responsive.directive';

@NgModule({
  declarations: [
    AppComponent,
    AddDataComponent,
    AddTutorialComponent,
    TutorialDetailsComponent,
    TutorialsListComponent,
    LoginComponent,
    LandingComponent,
    MatTableResponsiveDirective
  ],
  imports: [
    BrowserModule,
    SharedModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideAppCheck(() => {
      const provider = new ReCaptchaV3Provider(environment.recaptcha3SiteKey);
      return initializeAppCheck(undefined, {
        provider,
        isTokenAutoRefreshEnabled: true
      })
    }),
    BrowserAnimationsModule,
    HotToastModule.forRoot(),
    AppRouterModule
  ],
  providers: [
    {
      provide: FIREBASE_OPTIONS, useValue: environment.firebase,
    },
    {
      provide: MatDialogRef, useValue: {}
    },
    {
      provide: MAT_DIALOG_DATA, useValue: {}
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
