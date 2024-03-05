import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { QuestionState } from '../state/question.reducer';
import { Store } from '@ngrx/store';
import { QuestionActions } from '../state/question.actions';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [MatButtonModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
    constructor(
        private router: Router,
        private store: Store<QuestionState>
    ) {}

    handleStartQuiz(numberOfQuestions: number) {
        this.store.dispatch(
            QuestionActions.updateQuiz({
                quizIsEnded: false
            })
        );

        const typeOfQuestions = numberOfQuestions == 5 ? 'quick' : 'normal';

        this.router.navigate(['/quiz'], {
            queryParams: { type: typeOfQuestions }
        });
    }
}
