import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Question } from '../../models/question.model';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { QuestionState } from '../../../state/question.reducer';
import { QuestionActions } from '../../../state/question.actions';
import { Observable } from 'rxjs';
import { selectQuizEnded } from '../../../state/question.selectors';

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
export class CardComponent implements OnInit {
    @Input() questionData: Question | undefined;
    @Input() currentIndex: number | undefined;
    @Input() questionIndex: number | undefined;
    @Output() nextQuestionEvent = new EventEmitter<void>();
    @Output() prevQuestionEvent = new EventEmitter<void>();
    public quizIsEnded$: Observable<boolean> | undefined;

    constructor(private store: Store<QuestionState>) {}

    ngOnInit() {
        this.quizIsEnded$ = this.store.select(selectQuizEnded);
    }

    handleChooseAnswer(questionId: number, answerIndex: number) {
        this.store.dispatch(
            QuestionActions.updateQuestion({
                questionId,
                answerIndex
            })
        );
    }

    onClickPrevQuestion() {
        this.prevQuestionEvent.emit();
    }

    onClickNextQuestion() {
        this.nextQuestionEvent.emit();
    }
}
