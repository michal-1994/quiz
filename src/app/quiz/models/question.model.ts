export interface Question {
    id: number;
    question: string;
    answers: string[];
    correctAnswer: number;
    answerIndex?: number;
}
