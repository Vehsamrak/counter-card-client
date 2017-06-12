import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { HistoryComponent } from './components/history/history.component';
import { RoutingModule } from './routing.module';
import { HelpComponent } from './components/help/help.component';
import { CardComponent } from './components/card/card.component';
import { LoginComponent } from './components/login/login.component';
import { Authenticator } from './services/Authenticator';
import { AuthGuard } from './services/security/AuthGuard';
import { RegisterComponent } from './components/register/register.component';
import { HttpClient } from './services/http/HttpClient';
import { UserService } from './services/user/UserService';
import { CardService } from './services/card/CardService';
import { Pluralizer } from './services/Pluralizer';
import { DateProcessor } from "./services/DateProcessor";

@NgModule({
    declarations: [
        AppComponent,
        HistoryComponent,
        HelpComponent,
        CardComponent,
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RoutingModule,
    ],
    providers: [
        AuthGuard,
        Authenticator,
        HttpClient,
        UserService,
        CardService,
        Pluralizer,
        DateProcessor
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
