import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  protected username: string = '';

  public login(username: string): void {
    this.username = username;
  }

  public getUsername(): string {
    return this.username;
  }
}
