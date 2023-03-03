import { Injectable } from '@angular/core';
import {IUserBackend} from "../../common/interfaces/backend/User";
import {Observable, of, throwError} from "rxjs";
import {IUser, IUserLoginResponse} from "../../common/interfaces/frontend/User";
import {TUser} from "../../common/types/User";
import {Header} from "../../common/interfaces/header";

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  users: Map<string, IUserBackend> = new Map<string, IUserBackend>()
  constructor() {
    this.users.set('Jack', {
      id: 21351,
      name: 'Jack',
      creationDate: '',
      role: 'admin',
      expirationDate: ''
    })
    this.users.set('Bob', {
      id: Math.floor(Math.random() * 1_000_000),
      name: 'Bob',
      creationDate: '',
      role: 'admin',
      expirationDate: ''
    })
  }

  login(name: string): Observable<IUserLoginResponse> {
    if (this.users.has(name)) {
      const user = this.users.get(name)!;
      const currentTime: number = Date.now();
      const hourMs = 60 * 60 * 1000;
      // const hourMs = 1000;
      const expirationDate: number = currentTime + hourMs;
      return of({
        user,
        token: `${expirationDate}.${user.role}.${user.id}`
      })
    }
    return throwError(() => new Error('User is not exist'))
  }

  getUsersByUserId(header: Header) {
    const headerData = this.getDataFromToken(header);
    const users: IUser[] = [];
    if(headerData && headerData.id && headerData.role && headerData.expirationDate) {
      const {expirationDate, role, id} = headerData;
      const dateNow: number = Date.now();
      if(expirationDate >= dateNow) {
        if(role === 'admin') {
          users.push(...Array.from(this.users.values()).reduce((accumulator, currentValue) => {
            if (currentValue.id !== id) {
              const {name, role, creationDate} = currentValue;
              return [...accumulator, {name, role, creationDate}];
            }
            return accumulator;
          }, [] as IUser[]))
        }
        return of(users)
      } else {
        return throwError(() => new Error('Token has expired'))
      }
    }
    return throwError(() => new Error('Wrong token'))
  }

  getUserInfo(header: Header): Observable<IUser> {
    const headerData = this.getDataFromToken(header)
    if(headerData) {
      const user: IUser = Array.from(this.users.values()).filter(el => el.id === headerData.id)[0];
      if (user) {
        return of(user);
      }
      return throwError(() => new Error('User not exist'))
    }
    return throwError(() => new Error('Token is empty'))
  }

  private getDataFromToken(header: Header): {
    expirationDate: number;
    role: string;
    id: number;
  } | null {
    const token: string[] | undefined = header.token.split('.');
    const expirationDate: number | null = token && token[0] ? Number(token[0]) : null;
    const role: TUser | null = token && token[1] ? token[1] as TUser : null;
    const id: number | null = token && token[2] ? Number(token[2]) : null;

    return expirationDate && role && id ? {
      role,
      id,
      expirationDate
    } : null;
  }
}
