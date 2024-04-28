import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from '@progress/kendo-angular-conversational-ui';
import { MiniVetChatComponent } from './mini-vet-chat/mini-vet-chat.component';

export const routes: Routes = [
    {path:'home',component:HomeComponent},
    {path:'mini-vet-chat',component:MiniVetChatComponent}
];
