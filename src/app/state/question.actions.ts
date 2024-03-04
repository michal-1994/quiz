import { createActionGroup, props } from '@ngrx/store';
import { Question } from '../quiz/models/question.model';

export const QuestionActions = createActionGroup({
    source: 'Questions',
    events: {
        'Initial Questions': props<{ questions: Question[] }>(),
        'Update Question': props<{ questionId: number; answerIndex: number }>(),
        'Update Quiz': props<{ quizIsEnded: boolean }>()
    }
});
