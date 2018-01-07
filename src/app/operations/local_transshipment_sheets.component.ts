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
export class LocalTransshipmentSheetsComponent implements OnInit 
{
  isForm=true;
  isShow=true;
  fields:any[]=[];//form fields
  theads:String[]=[];//table heading fields
  componentName="Local Transshipment Sheets";//to display on the page
  tfields=['sheetNumber',"numberOfLRs",'fromBranch','toBranch'];//table fields

  public data=[
     {sheetNumber:'Local Transhipment need to be Done	',numberOfLRs:'357'},{		
      sheetNumber:'Page Total',	numberOfLRs:'357'}]
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
     var  test={name:'localVehicle',id:'localVehicle', value:'',type:'select',label:'Local Vehicle',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:['option1','option2']};
     this.fields.push(test);
     test={name:'status',id:'status', value:'',type:'select',label:'Status',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:['Pending','Completed']};
     this.fields.push(test);
     test={name:'fromDate',id:'fromDate',type:'date',label:'From Date',value:"",isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
     this.fields.push(test);
     test={name:'toDate',id:'toDate',type:'date',label:'To Date',value:"",isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
     this.fields.push(test);

     this.theads.push('Sheet Number',"Number of LR's",'From branch','To branch','Action');
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
      // this.cargoService.add(form.value,"local_transshipment_sheets");
  }


}
