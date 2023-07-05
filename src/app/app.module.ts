import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HotToastModule } from '@ngneat/hot-toast';

import { initializeAppCheck, provideAppCheck, ReCaptchaV3Provider } from '@angular/fire/app-check';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { SharedModule } from './shared/shared.module';
import { AddDataComponent } from './add-data/add-data.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component';
import { TutorialDetailsComponent } from './components/tutorial-details/tutorial-details.component';
import { TutorialsListComponent } from './components/tutorials-list/tutorials-list.component';
import { AppRouterModule } from './app.router.module';

@NgModule({
  declarations: [
    AppComponent,
    AddDataComponent,
    AddTutorialComponent,
    TutorialDetailsComponent,
    TutorialsListComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
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
