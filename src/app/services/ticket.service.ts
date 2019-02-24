import { HELPDESK_API } from './helpdesk.api';
import { Ticket } from './../model/ticket.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private httpClient: HttpClient) { }

  createOrUpdate(ticket: Ticket){
    if(ticket.id != null && ticket.id != ''){
      return this.httpClient.put(`${HELPDESK_API}/api/ticket`, ticket);
    }else{
      ticket.id = null;
      ticket.status = 'New';
      return this.httpClient.post(`${HELPDESK_API}/api/ticket`, ticket);
    }
  }

  findAll(page:number,count:number){
    return this.httpClient.get(`${HELPDESK_API}/api/ticket/${page}/${count}`);
  }

  findById(id:string){
    return this.httpClient.get(`${HELPDESK_API}/api/ticket/${id}`);
  }

  delete(id:string){
    return this.httpClient.delete(`${HELPDESK_API}/api/ticket/${id}`);
  }

  findByParams(page:number,count:number,assignedToMe:boolean,t:Ticket){
    t.number = t.number == null ? 0 : t.number;
    t.title = t.title == '' ? "uninformed" : t.title;
    t.status = t.status == '' ? "uninformed" : t.status;
    t.priority = t.priority == '' ? "uninformed" : t.priority;
    return this.httpClient.get(`${HELPDESK_API}/api/ticket/${page}/${count}/${t.number}/${t.title}/${t.status}/${t.priority}/${assignedToMe}`);
  }

  changeStatus(status:string,ticket:Ticket){
    return this.httpClient.put(`${HELPDESK_API}/api/ticket/${ticket.id}/${status}`,ticket);
  }

  summary(){
    return this.httpClient.get(`${HELPDESK_API}/api/ticket/summary`);
  }

}
