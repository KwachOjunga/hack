import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GeminiService } from './services/gemini.service';
import { ChatModule, SendMessageEvent } from '@progress/kendo-angular-conversational-ui';
import { HomeComponent } from './home/home.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ChatModule,HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mini-vet';

  geminiService = inject(GeminiService)
  user = this.geminiService.user;
  $messages = this.geminiService.$messages

  async generate(event: SendMessageEvent) {
    await this.geminiService.generate(event);
  }
}
