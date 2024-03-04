import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { QuestionState } from '../../../state/question.reducer';
import { Observable } from 'rxjs';
import {
    selectBarProgression,
    selectQuestions
} from '../../../state/question.selectors';
import { CommonModule } from '@angular/common';
import { Question } from '../../models/question.model';

@Component({
    selector: 'app-result',
    standalone: true,
    imports: [CommonModule, MatButtonModule],
    templateUrl: './result.component.html',
    styleUrl: './result.component.scss'
})
export class ResultComponent implements OnInit {
    public quizResult: string = '';
    public quizIsEnded: boolean = false;
    public quizProgress$: Observable<number> | undefined;
    public quizScore: number = 0;
    public questions$: Observable<Question[]> | undefined;

    constructor(private store: Store<QuestionState>) {}

    ngOnInit() {
        this.quizProgress$ = this.store.select(selectBarProgression);
    }

    handleResult() {
        this.quizIsEnded = true;

        this.store
            .select(selectQuestions)
            .subscribe((questions: Question[]) => {
                const correctAnswers = questions.filter(
                    (question: Question) =>
                        question.answerIndex === question.correctAnswerIndex
                );

                this.quizScore =
                    (correctAnswers.length * 100) / questions.length;
                this.quizResult = this.generateResult();
            });
    }

    generateResult(): string {
        let resultPrefix: string = '';

        if (this.quizScore === 100) {
            resultPrefix = 'Jesteś jak Mistrz Zaklęć';
        } else if (this.quizScore < 100 && this.quizScore > 50) {
            resultPrefix = 'Masz w sobie coś z Dobrego Czarodzieja';
        } else if (this.quizScore < 50 && this.quizScore > 20) {
            resultPrefix = 'Wciąż potrzebujesz trochę filozofii magicznej';
        } else {
            resultPrefix = 'Czas poćwiczyć zaklęcia';
        }

        return `${resultPrefix}`;
    }
}
