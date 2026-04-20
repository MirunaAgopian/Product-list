import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
    path = "";
    btnTxt = "Neues Produkt";
    ngOnInit(){
      this.path = "";
      if(this.path === "detail"){
        this.btnTxt = "Zurück zur Liste";
      }
    }
}
