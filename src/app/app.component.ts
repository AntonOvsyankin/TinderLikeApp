import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {AppService} from "./app.service";
import {Observable} from "rxjs";
import {PersonInfo} from "./app.types";

enum statusList {
  decline = 'decline',
  match = 'match'
}

@Component({
  providers: [AppService],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  @ViewChildren('tinderCard') tinderCards: QueryList<ElementRef> = new QueryList<ElementRef>();
  public data$: Observable<PersonInfo[]> = new Observable<PersonInfo[]>();
  public statusList: Array<'decline' | 'match'> = [];
  public showModal: boolean = true;
  public cardIndex: number = 0;

  constructor(private service: AppService) {
  }

  public ngOnInit(): void {
    this.data$ = this.service.getData();
  }

  public decline(index: number): void {
    this.tinderCards.get(index)!.nativeElement.style.transform = 'translate(-120px, 0)';
    this.tinderCards.get(index)!.nativeElement.style.visibility = 'hidden';
    this.statusList.push(statusList.decline)
    this.cardIndex++;
  }

  public match(index: number, person: PersonInfo): void {
    this.tinderCards.get(index)!.nativeElement.style.transform = 'translate(120px, 0)';
    this.tinderCards.get(index)!.nativeElement.style.visibility = 'hidden';
    this.statusList.push(statusList.match)
    if (person.matchedYou) {
      alert('MATCHED!!!');
    }
    this.cardIndex++;
  }

  public refresh(): void {
    if (this.tinderCards.length === this.statusList.length) {
      this.tinderCards.forEach((card, index) => {
        card!.nativeElement.style.transform = this.statusList[index] === statusList.decline ?
          'translate(0, 0)' : 'translate(0, 0)';
        card!.nativeElement.style.visibility = 'visible';
      })
      this.cardIndex = 0;
      this.statusList = [];
    } else {
      alert('Обновить можно только при пустом списке');
    }
  }
}
