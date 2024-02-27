import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [MatButtonModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
    constructor(private router: Router) {}

    handleStartQuiz(numberOfQuestions: number) {
        console.log('HomeComponent [handleStartQuiz]: ', numberOfQuestions);

        // TODO: Set number of questions to store
        // TODO: If number of questions are choosen set '/quiz' guard to true

        this.router.navigateByUrl('/quiz');
    }
}
