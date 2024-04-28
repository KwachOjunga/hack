import { Injectable, signal } from '@angular/core';
import { GoogleGenerativeAI, Part } from '@google/generative-ai';
import { environment } from '../../environments/environment.development';
import {
  Message,
  SendMessageEvent,
  User,
} from '@progress/kendo-angular-conversational-ui';

@Injectable({ providedIn: 'root' })
export class GeminiService {
  public readonly user = {
    id: crypto.randomUUID(),
    name: 'User',
    avatarUrl: '/assets/avatar8.png',
  };

  #generativeAI = new GoogleGenerativeAI(environment.gemini_key);
  #model = this.#generativeAI.getGenerativeModel({
    model: 'gemini-pro',
  });

  #prompt =
    'Imagine you are a virtual veterinary assistant helping farm animal owners with common health issues.' 
  ;

  readonly #kendoIA: User = {
    id: crypto.randomUUID(),
    name: 'Kendo UI',
    avatarUrl: '/assets/avatar6.png',
  };

  $messages = signal<Message[]>([
    {
      author: this.#kendoIA,
      timestamp: new Date(),
      text: 'Hi! 👋 I am Mini-Vet ...How can I help you today ?',
    },
  ]);

  #chatSession = this.#model.startChat({
    history: [
      {
        role: 'user',
        parts: [{ text: this.#prompt }],
      },
      {
        role: 'model',
        parts: [{ text: "Yes, I'm a animal owner" }],
      },
    ],
    generationConfig: {
      maxOutputTokens: 100,
    },
  });

  async generate(textInput: SendMessageEvent) {
    try {
      if (textInput.message.text && this.#chatSession) {
        this.$messages.update((p) => [...p, textInput.message]);

        const result = await this.#chatSession.sendMessage(
          textInput.message.text,
        );

        const response = result.response;
        const text = response.text();
        const message = {
          author: this.#kendoIA,
          timestamp: new Date(),
          text,
        };

        this.$messages.update((p) => [...p, message]);
      }
    } catch (e: any) {
      console.log(e);
    }
  }
}  
