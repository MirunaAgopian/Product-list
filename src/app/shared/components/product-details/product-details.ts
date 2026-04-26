import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails {
  //in this way I get to insert the product name in the URL
  private route = inject(ActivatedRoute);
  ngOnInit(){
    let currentName = this.route.snapshot.paramMap.get("name");
    if(currentName){
      this.detail.name = currentName;
    }
  }
  //in this way I get to insert the product name in the URL

  //this list should be an array of objects - and I should also
  //change the access method inside product-details.html
  detail = {
      name: 'Gaming Maus',
      description:
        'Eine ergonomische Gaming-Maus mit hoher Präzision und einstellbarer DPI. Ideal für FPS- und MOBA-Spiele, bietet sie eine langlebige Bauweise und komfortable Seitentasten für schnelles Reagieren.',
      specs: 'dpi: 6400, cable length: 1.8m, color: Schwarz',
      stock: 120,
      price: 25.99,
    }

    deleteDetail(){
      this.detail.name = "";
    }
}
