import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './components/history/history.component';
import { HelpComponent } from './components/help/help.component';
import { CardComponent } from './components/card/card.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/security/AuthGuard';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
    { path: '', redirectTo: '/card', pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'card', component: CardComponent, canActivate: [AuthGuard] },
    { path: 'help', component: HelpComponent, canActivate: [AuthGuard] },
    { path: 'history', component: HistoryComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RoutingModule {
}
