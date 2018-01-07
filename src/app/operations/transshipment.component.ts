import { Component , OnInit,ViewChild,Inject,ElementRef} from '@angular/core';
import { Http } from '@angular/http';
import { Router }            from '@angular/router';
import { NgForm } from '@angular/forms';
import { CargoOperationsService } from './cargo_operations.service';
import{Renderer} from  '@angular/core';
const urls=["assets/myscripts/init.js"];

@Component({
  templateUrl: 'cargo_operations.component.html'
})
export class TransshipmentComponent implements OnInit 
{
  isForm=true;
  fields:any[]=[];//form fields
  componentName="Transshipment";//to display on the page
  ngOnInit()
  {
    this.isForm=true;
    this.loadScript();
  }

  public loadScript() 
  {
        console.log('preparing to load...')
        urls.forEach(function(url) 
        {   
          let node = document.createElement('script');
          node.src = url;
          node.type = 'text/javascript';
          node.async = true;
          node.charset = 'utf-8';
          document.getElementsByTagName('body')[0].appendChild(node);
        });
  }

  constructor(private router: Router,private cargoService: CargoOperationsService, private http:Http, @Inject(Renderer) private renderer: Renderer)
  {
     var test={name:'source',id:'source', value:'',type:'select',label:'Source',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:["option1","option2","option3"]};
     this.fields.push(test);
     test={name:'destination',id:'destination', value:'',type:'select',label:'Destination',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:["option1","option2","option3"]};
     this.fields.push(test);
     test={name:'bookingDateFrom',id:'bookingDateFrom',type:'date',label:'Booking Date From',value:"",isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
     this.fields.push(test);
     test={name:'bookingDateTo',id:'bookingDateTo',type:'date',label:'Booking Date To',value:"",isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
     this.fields.push(test);

  }
    onSubmit(form:NgForm) 
  { 
      alert(JSON.stringify(form.value));
       for(let field of this.fields)
      {
        if(field['type']=="date" || field['type']=="date range" )
        {
          var name=field["name"];
          var datee=form.value[name] ;
          form.value[name]=datee.formatted;

        }
      } 
       alert(JSON.stringify(form.value));
      // this.cargoService.add(form.value,"transshipment");
  }

}
