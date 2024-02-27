import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Question } from '../../models/question.model';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        FormsModule,
        MatRadioModule,
        MatButtonModule
    ],
    templateUrl: './card.component.html',
    styleUrl: './card.component.scss'
})
export class CardComponent {
    @Input() data: Question | undefined;
    @Input() currentIndex: number | undefined;
    @Input() questionIndex: number | undefined;
    @Output() nextQuestionEvent = new EventEmitter<void>();
    @Output() prevQuestionEvent = new EventEmitter<void>();

    public youtAnswer: string = '';

    onClickNextQuestion() {
        this.nextQuestionEvent.emit();
    }

    onClickPrevQuestion() {
        this.prevQuestionEvent.emit();
    }
}
