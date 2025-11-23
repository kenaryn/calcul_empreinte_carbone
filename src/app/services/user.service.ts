import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  protected username: string = '';

  public login(username: string): Promise<void> {
    return new Promise((resolve) => {
      this.username = username;
      resolve();
    });
  }

  public async getUsername(): Promise<string> {
    return Promise.resolve(this.username);
  }
}
