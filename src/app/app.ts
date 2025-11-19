import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { CarbonFootprint } from './carbon-footprint/carbon-footprint';


@Component({
  selector: 'eni-root',
  imports: [Header, Footer, CarbonFootprint],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
