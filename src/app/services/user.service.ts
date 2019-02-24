import { HELPDESK_API } from './helpdesk.api';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  login(user: User){
    return this.httpClient.post(`${HELPDESK_API}/api/auth`, user);
  }

  createOrUpdate(user: User){
    if(user.id != null && user.id != ''){
      return this.httpClient.put(`${HELPDESK_API}/api/user`, user);
    }else{
      user.id = null;
      return this.httpClient.post(`${HELPDESK_API}/api/user`, user);
    }
  }

  findAll(page: number, count: number){
    return this.httpClient.get(`${HELPDESK_API}/api/user/${page}/${count}`);
  }

  findById(id: string){
    return this.httpClient.get(`${HELPDESK_API}/api/user/${id}`);
  }

  delete(id: string){
    return this.httpClient.delete(`${HELPDESK_API}/api/user/${id}`);
  }
}
