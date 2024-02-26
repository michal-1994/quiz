import { Component } from '@angular/core';
import { CardComponent } from './card/card.component';

@Component({
    selector: 'app-quiz',
    standalone: true,
    imports: [CardComponent],
    templateUrl: './quiz.component.html',
    styleUrl: './quiz.component.scss'
})
export class QuizComponent {}
