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
    public result: string = '';
    public quizIsEnded: boolean = false;
    public quizProgress$: Observable<number> | undefined;
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

                this.result = `${correctAnswers.length}/${questions.length}`;
            });
    }
}
