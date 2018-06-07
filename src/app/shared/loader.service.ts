import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoaderService {
 public status: Subject<boolean> = new Subject<boolean>();
 
 public display(value: boolean) {
  this.status.next(value);
 }
}