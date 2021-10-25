import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignInComponent } from './components/login/sign-in/sign-in.component';
import { SignUpComponent } from './components/login/sign-up/sign-up.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RestrictGuard } from './guard/restrict.guard';

const routes: Routes = [

{path:'', component:SignInComponent},
{path:'login', component:SignInComponent},
{path:'signup', component:SignUpComponent},

{path:'admin',loadChildren:()=> import('./modules/admin/admin.module').then(mod=>mod.AdminModule) },
{path:'user',loadChildren:()=> import('./modules/user/user.module').then(mod=>mod.UserModule) },


{path:'**',component:PageNotFoundComponent} //canActivate:[RestrictGuard]

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {  }
