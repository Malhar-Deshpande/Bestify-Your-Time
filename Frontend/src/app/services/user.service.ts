import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../components/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService 
{
  private baseUrl:string="http://localhost:8080/";

  constructor(private http:HttpClient)
  {

  }

  authenticateUser(data:IUser):Observable<HttpResponse<IUser>>{
    return this.http.post<IUser>(`${this.baseUrl}login`,data,{observe:'response'});
  }

  addUser(data:IUser):Observable<HttpResponse<IUser>>{
    return this.http.post<IUser>(`${this.baseUrl}signup`,data,{observe:'response'});
  }

    // Mod
    loginUser(data : IUser)
    {
      return this.http.post<any>(`${this.baseUrl}login`,data);
    }
  
    loggedIn()
    {
      return !!sessionStorage.getItem('token');
    }
  
    adminLoggedIn()
    {
      return !!sessionStorage.getItem('admin-token');
    }

    userLoggedIn()
    {
      return !!sessionStorage.getItem('user-token');
    }
  

}


