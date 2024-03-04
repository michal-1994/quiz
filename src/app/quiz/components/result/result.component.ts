import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { QuestionState } from '../../../state/question.reducer';
import { Observable } from 'rxjs';
import {
    selectBarProgression,
    selectQuestions,
    selectQuizEnded
} from '../../../state/question.selectors';
import { CommonModule } from '@angular/common';
import { Question } from '../../models/question.model';
import { QuestionActions } from '../../../state/question.actions';
import { Router } from '@angular/router';

@Component({
    selector: 'app-result',
    standalone: true,
    imports: [CommonModule, MatButtonModule],
    templateUrl: './result.component.html',
    styleUrl: './result.component.scss'
})
export class ResultComponent implements OnInit {
    public quizResult: string = '';
    public quizScore: number = 0;
    public quizProgress$: Observable<number> | undefined;
    public quizIsEnded$: Observable<boolean> | undefined;
    public questions$: Observable<Question[]> | undefined;

    constructor(
        private store: Store<QuestionState>,
        private router: Router
    ) {}

    ngOnInit() {
        this.quizProgress$ = this.store.select(selectBarProgression);
        this.quizIsEnded$ = this.store.select(selectQuizEnded);
    }

    handleResult() {
        this.store.dispatch(
            QuestionActions.updateQuiz({
                quizIsEnded: true
            })
        );

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

    handleStartGameAgain() {
        this.store.dispatch(
            QuestionActions.updateQuiz({
                quizIsEnded: false
            })
        );
        this.router.navigate(['/']);
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
