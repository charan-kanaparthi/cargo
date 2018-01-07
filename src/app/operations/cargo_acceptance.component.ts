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
export class CargoAcceptanceComponent implements OnInit 
{
  isForm=true;
  isShow=false;
  modalfields:any[]=[];
  deletemodalfields:any[]=[];
  theads=['Id','LR. No','LR Type','Service Number','Origin (Branch Name)','Destination','Items','Amount','No.of Items','Sender Name','Receiver Name','Handling Charges','Net Amount','Condition of Goods','Location','Remarks','Action']
  tfields=['Id','lrNo','lrType','serviceNumber','origin','destination','items','amount','noOfItems','senderName','receiverName','handlingCharges','netAmount','conditionofGoods','location','remarks']

  public data=[{Id:'1',lrNo:'P-9-374526',lrType:'Paid',serviceNumber:'Hyd to Yannam/ 252 (AP-07-TB-7777)',origin:'Hyderabad',destination:'Amalapuram',items:'Small Box',amount:'140.00',noOfItems:'1',senderName:'Srinivas',receiverName:'Kumar',	handlingCharges:'0.00',netAmount:'148.40'	
  ,action:'show'}];
  fields:any[]=[];//form fields
  componentName="Cargo Acceptance";//to display on the page
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
     var test={name:'station',id:'station', value:'',type:'select',label:'Station',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:['option1','option2']};
     this.fields.push(test);
     test={name:'dateRange',id:'dateRange',type:'date range',label:'Date Range',value:"",isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:['option1','option2']};
     this.fields.push(test);
     test={name:'serviceName',id:'serviceName', value:'',type:'select',label:'Service Name',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:['option1','option2']};
     this.fields.push(test);
     test={name:'bookingBranch',id:'bookingBranch', value:'',type:'select',label:'Booking Branch',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:['option1','option2']};
     this.fields.push(test);
     test={name:'isRecevied',id:'',type:'radio',label:'Is Received',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',value:"",options:['received','To be Recieved']};
     this.fields.push(test);
     //modalfields

  
     test={name:'lrNo',id:'',type:'text', value:'', label:'LR No',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
       test={name:'lrType',id:'', value:'',type:'text',label:'LR Type',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'serviceNumber',id:'', value:'',type:'text',label:'Service Number',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'origin',id:'', value:'',type:'text',label:'Source',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'destination',id:'',type:'text', value:'', label:'Destination',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'amount',id:'',type:'text', value:'', label:'Amount',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
       test={name:'items',id:'', value:'',type:'text',label:'Items',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'noOfItems',id:'',type:'text', value:'', label:'No Of Items',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'senderName',id:'',type:'text', value:'', label:'Sender Name',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
       test={name:'receiverName',id:'', value:'',type:'text',label:'Receiver Name',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'handlingCharges',id:'', value:'',type:'text',label:'Handling Charges',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'netAmount',id:'', value:'',type:'text',label:'Net Amount',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'conditionOfGoods',id:'', value:'',type:'text',label:'Condition Of Goods',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'location',id:'', value:'',type:'text',label:'Location',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
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
