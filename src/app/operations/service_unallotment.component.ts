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
export class ServiceUnallotmentComponent implements OnInit 
{
  isForm=true;
  isShow=false;
  fields:any[]=[];//form fields
  componentName="Service UnAllotment";//to display on the page
  modalfields:any[]=[];
  deletemodalfields:any[]=[];
	theads:String[]=['Id','LR. No','LR Type','Amount','No.of Items','Date of Booking','Source (Branch Name)','Destination (Branch Name)','Condition of Goods','Remarks','Action']
  tfields=['Id','lrNo','lrType','amount','items','dateOfBooking','source','destination','conditionOfGoods','remarks']
  
  public data=[{ Id:'1',lrNo:'P-9-377970',lrType:'Paid',	amount:'127.2',items:'1',dateOfBooking:'02/07/2017 01:42 PM',source:'Hyderabad',destination:'Ponnuru',conditionOfGoods:'good',action:'show'}];
  
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
     var test={name:'serviceName',id:'serviceName', value:'',type:'select',label:'Service Name',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:["option1","option2","option3"]};
     this.fields.push(test);
     test={name:'allotmentDate',id:'allotmentDate',type:'date',label:'Allotment Date',value:"",isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
     this.fields.push(test);
     test={name:'registrationNumber',id:'registrationNumber', value:'',type:'select',label:'Registration Number',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:["option1","option2","option3"]};
     this.fields.push(test);
     test={name:'source',id:'source', value:'',type:'select',label:'Source',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:["option1","option2","option3"]};
     this.fields.push(test);
     test={name:'destination',id:'destination', value:'',type:'select',label:'Destination',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:["option1","option2","option3"]};
     this.fields.push(test);
     test={name:'bookingDate',id:'bookingDate',type:'date range',label:'Booking Date To',value:"",isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
     this.fields.push(test);
     test={name:'bookingBranch',id:'bookingBranch', value:'',type:'select',label:'Booking Branch',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:["option1","option2","option3"]};
     this.fields.push(test);
        //modal fields

      test={name:'lrNo',id:'',type:'text', value:'', label:'LR No',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
       test={name:'lrType',id:'', value:'',type:'text',label:'LR Type',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'amount',id:'',type:'text', value:'', label:'Amount',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
       test={name:'items',id:'', value:'',type:'text',label:'No of Items',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'dateOfBooking',id:'',type:'text', value:'', label:'Date Of Booking',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
       test={name:'source',id:'', value:'',type:'text',label:'Source',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'destination',id:'',type:'text', value:'', label:'Destination',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'conditionOfGoods',id:'', value:'',type:'text',label:'Condition Of Goods',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'remarks',id:'', value:'',type:'text',label:'Remarks',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
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
