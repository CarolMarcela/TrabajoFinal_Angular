import { Component, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { RickAndMortyService } from '../services/rick-and-morty.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CharactersService } from '../services/character.service';
import {
  MatDialog,
  
} from '@angular/material/dialog';
import { CharacterComponent } from '../character/character.component';

@Component({
  selector: 'app-list-Character',
  standalone: true,
  imports: [MaterialModule, HttpClientModule],
  providers: [RickAndMortyService],
  templateUrl: './Character-list.component.html',
  styleUrls: ['./Character-list.component.scss']
})
export class CharacterListComponent implements OnInit {
  CharacterList: any = {};

  constructor(
    private dialog: MatDialog,
    private RyM: RickAndMortyService,
    private charactersService: CharactersService
  ) { }

  ngOnInit(): void {
    this.RyM.obtenerCharacters().subscribe({
      next: (data: any) => {
        this.CharacterList = data;
        this.charactersService.setCharacters(data);
        console.log(this.CharacterList);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  SiguientePagina(): void {
    if (this.CharacterList.info.next) {
      this.RyM.nextPage(this.CharacterList.info.next).subscribe({
        next: (data: any) => {
          this.CharacterList = data;
        },
        error: (err: any) => {
          console.log(err);
        }
      });
    }
  }

  PaginaAnterior(): void {
    if (this.CharacterList.info.prev) {
      this.RyM.nextPage(this.CharacterList.info.prev).subscribe({
        next: (data: any) => {
          this.CharacterList = data;
        },
        error: (err: any) => {
          console.log(err);
        }
      });
    }
  }

  openDialog(id: string): void {
    this.dialog.open(CharacterComponent, {
      data: {
        id
      },
    });
  }

  trackByFn(index: number, item: any): number {
    return item.id;
  }
}