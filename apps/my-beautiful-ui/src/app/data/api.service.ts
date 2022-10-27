import { HttpClient }    from '@angular/common/http';
import { Injectable }    from '@angular/core';
import { IUserResponse } from '@nx-angular-nest/domain';
import { Observable }    from 'rxjs';
import { LoginForm }     from '../shared/login-form.type';
import { RegisterForm }  from '../shared/register-form.type';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:4200/api';

  constructor(
    private readonly httpClient: HttpClient,
  ) {
  }

  private getAbsoluteUrl(path: string): string {
    return this.baseUrl + path;
  }

  login(credentials: LoginForm): Observable<IUserResponse> {
    return this.httpClient.post<IUserResponse>(
      this.getAbsoluteUrl('/auth/login'),
      credentials,
    );
  }

  register(credentials: RegisterForm): Observable<IUserResponse> {
    return this.httpClient.post<IUserResponse>(
      this.getAbsoluteUrl('/auth/register'),
      credentials
    );
  }

  logout(): Observable<IUserResponse> {
    return this.httpClient.post<IUserResponse>(
      this.getAbsoluteUrl('/auth/logout'),
      {}
    );
  }

  fetchProfile(): Observable<IUserResponse> {
    return this.httpClient.get<IUserResponse>(
      this.getAbsoluteUrl('/users/profile')
    );
  }

}
