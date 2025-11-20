import {Component, inject, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'eni-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {

  protected route: ActivatedRoute = inject(ActivatedRoute);

  protected username: string = '';

  ngOnInit(): void {
    let user: string | null = this.route.snapshot.paramMap.get('username');
    if (user) {
      this.username = user;
    }
  }
}
