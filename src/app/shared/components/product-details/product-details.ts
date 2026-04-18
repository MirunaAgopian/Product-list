import { Component } from '@angular/core';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails {
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
