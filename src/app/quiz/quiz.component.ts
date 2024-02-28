import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardComponent } from './components/card/card.component';
import { QuizService } from './services/quiz.service';
import { Question } from './models/question.model';

@Component({
    selector: 'app-quiz',
    standalone: true,
    imports: [CommonModule, CardComponent],
    templateUrl: './quiz.component.html',
    styleUrl: './quiz.component.scss'
})
export class QuizComponent implements OnInit {
    public questions: Question[] = [];
    public currentIndex: number = 0;

    constructor(private quizService: QuizService) {}

    ngOnInit() {
        this.quizService.getQuestions().subscribe((data: Question[]) => {
            this.questions = this.getRandomQuestions(data, 10);

            console.log('QuizComponent [ngOnInit]: ', this.questions);
        });
    }

    getRandomQuestions(
        questions: Question[],
        numberOfQuestions: number
    ): Question[] {
        return [...questions]
            .sort(() => 0.5 - Math.random())
            .slice(0, numberOfQuestions);
    }

    handleNextQuestion() {
        if (this.currentIndex < this.questions.length - 1) {
            this.currentIndex++;
        }
    }

    handlePrevQuestion() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        }
    }
}
