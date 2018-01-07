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
export class OfflineBookingComponent implements OnInit 
{
  isForm=true;
  fields:any[]=[];//form fields
  componentName="Off-Line Booking";//to display on the page
  theads=[];//table heads
  tfields=['Id','lrNumber','origin','destination','bookedBy','netAmount'];
  public data=[{ Id:'1',lrNumber:'P-9-377970',origin:'hyderbad',destination:'kakinda',amount:'127.2',bookedBy:'kumar',netAmount:'233',action:'show'}];
  
  modalfields:any[]=[];
  deletemodalfields:any[]=[];
  isShow=false;
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
     var test={name:'From',id:'From',type:'date',label:'From',value:"",isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:["option1","option2","option3"]};
     this.fields.push(test);
     test={name:'To',id:'To',type:'date',label:'To',value:"",isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:["option1","option2","option3"]};
     this.fields.push(test);
     //  
      test={name:'lrNumber',id:'', value:'',type:'text',label:'LR No',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
       test={name:'origin',id:'', value:'',type:'text',label:'Origin',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
       test={name:'destination',id:'', value:'',type:'text',label:'Destination',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
       test={name:'bookedBy',id:'', value:'',type:'text',label:'Booked By',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
       test={name:'netAmount',id:'', value:'',type:'text',label:'Net Amount',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
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
     this.theads.push('Id','LR Number','Origin','Destination','Booked By','Net Amount','Actions');
    
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
      // this.cargoService.add(form.value,"service_allotment");
      this.isShow=true;
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
