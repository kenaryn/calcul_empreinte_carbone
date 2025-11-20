import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { CarbonFootprint } from '../carbon-footprint/carbon-footprint';

@Component({
  selector: 'eni-summary',
  imports: [
    FormsModule,
    Header,
    Footer,
    CarbonFootprint
  ],
  templateUrl: './summary.html',
  styleUrl: './summary.css',
})
export class Summary {

}
