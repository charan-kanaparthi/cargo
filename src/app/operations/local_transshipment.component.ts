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
export class LocalTransshipmentComponent implements OnInit 
{
  isForm=true;
  isShow=false;
  fields:any[]=[];//form fields
  theads:String[]=[];//table heading fields
  componentName="Local Transshipment";//to display on the page
  modalfields:any[]=[];
  deletemodalfields:any[]=[];
   tfields=['Id','sNo','lrBookedDate','lrNo','lrType','items','quantity','from','to'];
   public data=[
                    {Id:1,sNo:'1',lrBookedDate:'19-05-2017',lrNo:'P-9-349459',lrType:'Paid',items:'Packet',quantity:'6',from:'Amalapuram',to:'Hyderabad',action:"show"
                    },
                    {Id:2,sNo:'2',lrBookedDate:'19-05-2017',lrNo:'P-9-349459',lrType:'Paid',items:'Packet',quantity:'6',from:'Amalapuram',to:'Hyderabad',action:'show'
                    }   
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

  constructor(private router: Router,private cargoService: CargoOperationsService, private http:Http, @Inject(Renderer) private renderer: Renderer)
  {
      var  test={name:'branch',id:'branch', value:'',type:'select',label:'Branch',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:["option1","option2","option3"]};
      this.fields.push(test);
      test={name:'dateFrom',id:'dateFrom',type:'date',label:'Date From',value:"",isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.fields.push(test);    
      test={name:'dateTo',id:'dateTo',type:'date',label:'Date To',value:"",isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.fields.push(test);
      //modalfields
      test={name:'sNo',id:'s.no', value:'',type:'text',label:'S.No',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'lrBookedDate',id:'',type:'text', value:'', label:'LR Booked Date',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
       test={name:'lrNo',id:'', value:'',type:'text',label:'LR. No',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'lrType',id:'',type:'text', value:'', label:'LR Type',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
       test={name:'items',id:'', value:'',type:'text',label:'Items',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'quantity',id:'',type:'text', value:'', label:'Quantity',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
       test={name:'from',id:'', value:'',type:'text',label:'From',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'to',id:'',type:'text', value:'', label:'To',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
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
      
    
     this.theads.push('Id','S.No','LR Booked Date','LR. No','LR Type','Items','Quantity','From','To','Actions');
     
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
      // this.cargoService.add(form.value,"vehicle_allotment");
      this.isShow=true
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