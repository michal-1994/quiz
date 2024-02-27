export interface Question {
    id: number;
    question: string;
    answers: string[];
    correct_answer: number;
}

export interface QuestionData {
    questions: Question[];
    length: number;
}
