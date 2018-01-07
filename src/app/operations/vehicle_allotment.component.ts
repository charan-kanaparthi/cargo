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
export class VehicleAllotmentComponent implements OnInit 
{
  isForm=true;
  isShow=false;
  fields:any[]=[];//form fields
  theads:String[]=[];//table heading fields
  componentName="Vehicle Allotment";//to display on the page
  modalfields:any[]=[];
  deletemodalfields:any[]=[];
   tfields=['Id','service','route_name','way_bill_no','source','reg_num','driver1','driver2','cleaner','status'];//table fields
  public data=[
    {Id:'1',service:'22',route_name:'Chirala-Hyderabad',way_bill_no:'WN/CS/9/19/43/030720170636',source:'Hyderabad',reg_num:'AP-07-TE-222',driver1:'Sambi reddy y',driver2:'papa rao',cleaner:'Rajutokala',status:'Active',action:'show'},
    {Id:'2',service:'107',route_name:'Bapatla to Hyderabad	',way_bill_no:'WN/CS/9/39/13/030720170139',source:'Bapatla',reg_num:'AP-07-TB-7777',driver1:'Sambi reddy y',driver2:'papa rao',cleaner:'Rajutokala',status:'Active',action:'show'},
    {Id:'3',service:'33A',route_name:'Hyderabad To Bapatla',way_bill_no:'WN/CS/9/21/46/030720170636',source:'Hyderabad	',reg_num:'AP-07-TW-333',driver1:'Sambi reddy y',driver2:'papa rao',cleaner:'Rajutokala',status:'Active',action:'show'}
     ,{Id:'4',service:'22',route_name:'Chirala-Hyderabad',way_bill_no:'WN/CS/9/19/43/030720170636',source:'Hyderabad',reg_num:'AP-07-TE-222',driver1:'Sambi reddy y',driver2:'papa rao',cleaner:'Rajutokala',status:'Active',action:'show'},
    {Id:'5',service:'107',route_name:'Bapatla to Hyderabad	',way_bill_no:'WN/CS/9/39/13/030720170139',source:'Bapatla',reg_num:'AP-07-TB-7777',driver1:'Sambi reddy y',driver2:'papa rao',cleaner:'Rajutokala',status:'Active',action:'show'},
    {Id:'6',service:'33A',route_name:'Hyderabad To Bapatla',way_bill_no:'WN/CS/9/21/46/030720170636',source:'Hyderabad	',reg_num:'AP-07-TW-333',driver1:'Sambi reddy y',driver2:'papa rao',cleaner:'Rajutokala',status:'Active',action:'show'}
    
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
  var  test={name:'source',id:'source', value:'',type:'select',label:'Source',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:["option1","option2","option3"]};
     this.fields.push(test);
     test={name:'date',id:'date',type:'date',label:'Date',value:"",isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
     this.fields.push(test);
     
   //  test={name:'reg_num',id:'reg_num', value:'',type:'select',label:'Registration Number',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:["option1","option2","option3"]};
       test={name:'service',id:'name', value:'',type:'text',label:'Service',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'source',id:'',type:'text', value:'', label:'Source',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
       test={name:'route_name',id:'name', value:'',type:'text',label:'Route Name',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'way_bill_no',id:'',type:'text', value:'', label:'Way Bill No',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
       test={name:'reg_num',id:'name', value:'',type:'text',label:'Registration',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'driver1',id:'',type:'text', value:'', label:'Driver 1',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
       test={name:'driver2',id:'name', value:'',type:'text',label:'Driver 2',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'cleaner',id:'',type:'text', value:'', label:'Cleaner',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
       test={name:'status',id:'',type:'text', value:'', label:'Status',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
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
      
    

     this.theads.push('Id','Service','Route Name','Vehicle Waybill No','Source','Registration Number','Driver1','Driver2','Cleaner','Status','Actions');
     
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