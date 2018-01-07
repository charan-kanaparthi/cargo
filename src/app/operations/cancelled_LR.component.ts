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
export class CancelledCargoLRComponent implements OnInit 
{
  isForm=true;
  isShow=false;
  modalfields:any[]=[];
  deletemodalfields:any[]=[];
  fields:any[]=[];//form fields
  componentName="Cancelled LR ";//to display on the page
  theads=[];//table heads
 tfields=['Id','lrNumber','bookingStatus','description'];
  public data=[{ Id:'1',lrNumber:'P-9-376704',bookingStatus:'Booked',description:'Cargo is booked. Sent by: B.N Rao. To be received by P.Venky',action:'show'},
  {Id:'2',lrNumber:'P-9-376703',bookingStatus:'Booked',description:'Cargo is booked. Sent by : MGP Square. To be received by Praveen',action:'show'},
  {Id:'3',lrNumber:'F-9-15614',bookingStatus:'Booked',description:'Cargo is booked. Sent by: M.Sudhakar. To be received by R.V.Rao',action:'show'}
  ];
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
constructor(private router: Router, private cargoService: CargoOperationsService, private http:Http, @Inject(Renderer) private renderer: Renderer)
  {
     var test={name:'From',id:'From',type:'date',label:'From',value:"",isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
     this.fields.push(test);
     test={name:'To',id:'To',type:'date',label:'To',value:"",isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
     this.fields.push(test);
     //modalfiedls
      test={name:'lrNumber',id:'', value:'',type:'text',label:'LR No',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'bookingStatus',id:'',type:'text', value:'', label:'Status',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'description',id:'',type:'text', value:'', label:'Description',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'Id',id:'Id',type:'hidden', value:'', label:'',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'operation',id:'text',type:'hidden',label:'', value:'update', isRequired:false,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      
      //deletemodal fields
      test={name:'Id',id:'Id',type:'hidden', value:'', label:'',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.deletemodalfields.push(test);
      test={name:'status',id:'status',type:'hidden',label:'', value:'deleted', isRequired:false,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.deletemodalfields.push(test);
      test={name:'operation',id:'text',type:'hidden',label:'', value:'update', isRequired:false,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.deletemodalfields.push(test);
     this.theads.push('Id','LR Number','Status','Description','Action');
  }
   onSubmit(form:NgForm) 
  {  
      this.isShow=true;
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
      // this.cargoService.add(form.value,"cargo_acceptance");
  }

   onSelect(item:any){
   var selectedData=item; 
     for (let ref of this.modalfields) {
              for(let tff of this.tfields){ 
                  if(ref['name']==tff)
                  {                  //  alert(ref['name'])
                    ref.value=item[tff];
                     if(ref.name=="Id"){               
                        this.deletemodalfields[0].value=item[tff];
                       }
                   }
              }
            }
 //alert(JSON.stringify(this.modalfields));
 }

}


