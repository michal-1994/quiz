import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { QuestionState } from '../../../state/question.reducer';
import { Store } from '@ngrx/store';
import { selectBarProgression } from '../../../state/question.selectors';
@Component({
    selector: 'app-progress',
    standalone: true,
    imports: [CommonModule, MatProgressBarModule],
    templateUrl: './progress.component.html',
    styleUrl: './progress.component.scss'
})
export class ProgressComponent implements OnDestroy, OnInit {
    private routerSubscription: Subscription = new Subscription();
    public currentUrl: string = '';
    public quizProgress$: Observable<number> | undefined;

    constructor(
        private router: Router,
        private store: Store<QuestionState>
    ) {}

    ngOnInit() {
        this.routerSubscription = this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                this.currentUrl = this.router.url;
            });

        this.quizProgress$ = this.store.select(selectBarProgression);
    }

    ngOnDestroy() {
        if (this.routerSubscription) {
            this.routerSubscription.unsubscribe();
        }
    }
}
