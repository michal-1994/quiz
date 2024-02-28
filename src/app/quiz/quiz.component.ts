import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardComponent } from './components/card/card.component';
import { QuizService } from './services/quiz.service';
import { Question } from './models/question.model';
import { ActivatedRoute } from '@angular/router';

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
    public title: string = '';

    constructor(
        private quizService: QuizService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.setTitle(params['type']);
            this.quizService.getQuestions().subscribe((data: Question[]) => {
                this.questions = this.getRandomQuestions(data, params['type']);
            });
        });
    }

    setTitle(type: string) {
        this.title = type === 'quick' ? 'Szybka gra' : 'Normalna gra';
    }

    getRandomQuestions(questions: Question[], type: string): Question[] {
        const numberOfQuestions = type === 'quick' ? 5 : 10;
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
