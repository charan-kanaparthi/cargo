import { Component , OnInit,ViewChild,Inject,ElementRef} from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import{Renderer} from  '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  templateUrl: 'agents.component.html'
})
export class AgentsComponent implements OnInit 
{
  isForm=true;
  ngOnInit()
  {
    
  }

  constructor(private router: Router, private http:Http, @Inject(Renderer) private renderer: Renderer)
  {}


   onSubmit(form:NgForm) 
  { 
     alert(JSON.stringify(form.value));
  }
}
