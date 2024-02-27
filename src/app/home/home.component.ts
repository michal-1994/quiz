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
        console.log('handleStartQuiz: ', numberOfQuestions);
        this.router.navigateByUrl('/quiz');
    }
}
