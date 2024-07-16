import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  private charactersSource = new BehaviorSubject<any>({});
  characters$ = this.charactersSource.asObservable();

  setCharacters(characters: any) {
    this.charactersSource.next(characters);
  }
}