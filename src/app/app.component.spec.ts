import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
    let element: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent],
            imports: [RouterTestingModule]
        }).compileComponents();
    }));

    it('create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it('render title', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        element = fixture.debugElement.query(By.css('header')).nativeElement;
        expect(element.textContent).toContain('Электронная Карточка');
    }));
});
