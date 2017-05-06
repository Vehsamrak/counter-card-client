import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './components/history/history.component';
import { HelpComponent } from './components/help/help.component';

const routes: Routes = [
    { path: 'help', component: HelpComponent },
    { path: 'history', component: HistoryComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RoutingModule {}
