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
    @Input() questionData: Question | undefined;
    @Input() currentIndex: number | undefined;
    @Input() questionIndex: number | undefined;
    @Output() nextQuestionEvent = new EventEmitter<void>();
    @Output() prevQuestionEvent = new EventEmitter<void>();

    handleChooseAnswer(questionId: number, answerIndex: number) {
        console.log('questionId: ', questionId);
        console.log('answerIndex: ', answerIndex);
    }

    onClickPrevQuestion() {
        this.prevQuestionEvent.emit();
    }

    onClickNextQuestion() {
        this.nextQuestionEvent.emit();
    }
}
