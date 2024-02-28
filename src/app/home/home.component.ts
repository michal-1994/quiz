import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { QuestionState } from '../state/question.reducer';
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
            QuestionActions.setNumberOfQuestions({ numberOfQuestions })
        );

        this.router.navigateByUrl('/quiz');
    }
}
