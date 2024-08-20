import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
})
export class SearchBoxComponent implements OnInit, OnDestroy {



  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter();
  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter();
  @ViewChild('txtInput')
  public tInput!: ElementRef<HTMLInputElement>
  @Input()
  public placeholder: string = '';
  @Input()
  public initialValue: string = '';

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
    .pipe(
      // debounceTime(300)
    )
    .subscribe( value => {
      this.onDebounce.emit( value );
    })
  }

  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
  }
  emitTerm(): void{
    this.onValue.emit( this.tInput.nativeElement.value );
    this.tInput.nativeElement.value = '';
  }

  onKeyPress( searchTerm: string ){
    this.debouncer.next( searchTerm );
  }


}
