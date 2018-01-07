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

export class CargoDeliveryComponent implements OnInit 
{
  isForm=true;
  isShow=false;
  fields:any[]=[];//form fields
  modalfields:any[]=[];
  deletemodalfields:any[]=[];
  theads=['Id','LR. No','WayBill No','LR Type','Amount','No.of Items','Sender Name','Receiver Name','Condition of Goods','Remarks','Feedback','Action']
  tfields=['Id','lrNo','wayBillNo','lrType','amount','noOfItems','senderName','receiverName','conditionofGoods','remarks','feedback',]
  
  public data=[{ Id:'1',lrNo:'P-9-372547',lrType:'Paid',amount:'299.38',noOfItems:'1',senderName:'vijaykumar',receiverName:'gopi'	
  ,action:'show'
}]
  componentName="Cargo Delivery";//to display on the page
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
     var test={name:'deliveryDateFrom',id:'deliveryDateFrom',type:'date',label:'Delivery Date From',value:"",isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
     this.fields.push(test);
     test={name:'deliveryDateTo',id:'deliveryDateTo',type:'date',label:'Delivery Date To',value:"",isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
     this.fields.push(test);
     test={name:'isDelivered',id:'',type:'radio',label:'',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',value:"",options:['To Be Delivered','Delivered']};
     this.fields.push(test);
     // modalfields
     test={name:'lrNo',id:'',type:'text', value:'', label:'LR No',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
       test={name:'lrType',id:'', value:'',type:'text',label:'LR Type',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'wayBillNo',id:'', value:'',type:'text',label:'Way Bill No',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'amount',id:'',type:'text', value:'', label:'Amount',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'noOfItems',id:'',type:'text', value:'', label:'No Of Items',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'senderName',id:'',type:'text', value:'', label:'Sender Name',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
       test={name:'receiverName',id:'', value:'',type:'text',label:'Receiver Name',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'conditionOfGoods',id:'', value:'',type:'text',label:'Condition Of Goods',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'remarks',id:'', value:'',type:'text',label:'Remarks',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'feedback',id:'', value:'',type:'text',label:'Feedback',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
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
