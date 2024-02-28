export interface Question {
    id: number;
    question: string;
    answers: string[];
    correctAnswerIndex: number;
    answerIndex?: number;
}
