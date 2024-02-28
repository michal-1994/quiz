import { createActionGroup, props } from '@ngrx/store';
import { Question } from '../quiz/models/question.model';

export const QuestionActions = createActionGroup({
    source: 'Questions',
    events: {
        'Set Number Of Questions': props<{ numberOfQuestions: number }>(),
        'Initial Questions': props<{ questions: Question[] }>(),
        'Update Question': props<{ questionId: number; answerIndex: number }>()
    }
});
