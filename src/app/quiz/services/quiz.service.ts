import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../models/question.model';

@Injectable({
    providedIn: 'root'
})
export class QuizService {
    private questionsUrl = 'assets/api/questions.json';

    constructor(private http: HttpClient) {}

    getQuestions(): Observable<Question[]> {
        return this.http.get<Question[]>(this.questionsUrl);
    }
}
