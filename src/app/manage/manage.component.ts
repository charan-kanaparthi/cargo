import { Component , OnInit,ViewChild,Inject,ElementRef} from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import{Renderer} from  '@angular/core';

@Component({
  templateUrl: 'manage.component.html'
})
export class ManageComponent implements OnInit 
{
  isForm=false;
  ngOnInit()
  {
    this.isForm=false;
  }

  constructor(private router: Router, private http:Http, @Inject(Renderer) private renderer: Renderer)
  {}

}
