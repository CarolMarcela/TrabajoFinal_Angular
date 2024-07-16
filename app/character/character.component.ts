import { Component, Inject, OnInit } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { MatDialogContent, MatDialogTitle,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RickAndMortyService } from '../services/rick-and-morty.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-character',
  standalone: true,
  imports: [MaterialModule,MatDialogTitle, MatDialogContent,HttpClientModule],
  providers :[RickAndMortyService],
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss'
})
export class CharacterComponent implements OnInit {
  character :any;
constructor(
  private RyM: RickAndMortyService,@Inject(MAT_DIALOG_DATA) public data: any){

}
  ngOnInit(): void {
   this.RyM.obtenerUnCharacter(this.data.id).subscribe({
    next: (respuesta: any) =>{
      this.character = respuesta
    }
   })
  }

}