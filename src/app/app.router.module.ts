import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TutorialsListComponent } from './components/tutorials-list/tutorials-list.component';
import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { LoginComponent } from './login/login.component';

const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: '', redirectTo: 'tutorials', pathMatch: 'full'
  },
  {
    path: 'tutorials', component: TutorialsListComponent,
    ...canActivate(redirectToLogin)
  },
  {
    path: 'add', component: AddTutorialComponent,
    ...canActivate(redirectToLogin)
  },
  {
    path: 'login', component: LoginComponent,
    ...canActivate(redirectToHome)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouterModule { }
