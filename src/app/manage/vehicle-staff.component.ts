import { Component , OnInit,Renderer,ViewChild,Inject} from '@angular/core';
import { Http } from '@angular/http';
import { NgForm } from '@angular/forms';
import { Router }  from '@angular/router';
import { ManageService } from './manage.service';

export class Field
{
  name:string;
  id : string;
  type:string;
  label:string;
  isRequired:boolean;
  isReadOnly:boolean;
  isSelected:boolean;
  className :string;
  value:string;
  
  constructor(name:string,id:string,type:string,label:string,value:string,isRequired:boolean,isReadOnly:boolean,isSelected:boolean,className:string)
  {
    this.name=name;
    this.id=id;
    this.type=type;
    this.label=label;
    this.isRequired=isRequired;
    this.isReadOnly=isReadOnly;
    this.isSelected=isSelected;
    this.className=className;
    this.value = value;

  }
}

const urls=[
        "assets/myscripts/init.js"
    ];



@Component({
  templateUrl: 'manage2.component.html'
})
export class VehicleStaffComponent implements OnInit 
{
  fields:Field[]=[];
  theads=["Id","Employee Name","E-mail Id","Contact Details","Employee Type","City","Action"]
  modalfields:Field[]=[];
  deletemodalfields:Field[]=[];
  selectedBranch=null;
  moreFields:any[]=[];
  loadAPI:Promise<any>;
   componentName="Vechicle Staff"
  //public data:any[]=[];
  public selectedData:any[]=[];
  public file;
  public statesIds:any[]=[];
  public statesValues:any[]=[];
  public statesData:any;
  public citiesIds:any[]=[];
  public citiesValues:any[]=[];
  public citiesData:any;
  isForm=true;
  tfields=["Id","employeeName","emailId","contactDetails","employeeType","city"];
  editMoreFields:Field[]=[];
  ngOnInit()
  {
     this.loadScript();
  }

   public data=
 [
    {Id:1,employeeName:'Sambi Reddy Y',contactDetails:'9963837780',employeeType:'Driver',city:"Guntur",action:"show"},
  {Id:2,employeeName:'Sambi',contactDetails:'9963837780',employeeType:'Driver',city:"Guntur",action:"show"},
 ];
 constructor(private router: Router,private manageService: ManageService,private http:Http,@Inject(Renderer) private renderer: Renderer) 
  {
    //   this.getStatesData();
    //   this.getCitiesData();
      var test={name:'fullName',id:'',type:'text',value:'',label:'Full  Name',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.fields.push(test);
      test={name:'gender',id:'',type:'radio',value:'',label:'Gender',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:['Male','Female']};
      this.fields.push(test);
      test={name:'employeeId',id:'',type:'text',value:'',label:'Employee Id',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:['option1','option2']};
      this.fields.push(test);     
      test={name:'branch',id:'',type:'select',value:'',label:'Branch',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:['option1','option2']};
      this.fields.push(test);
      test={name:'employeeType',id:'',type:'radio',value:'',label:'Gender',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:['driver','local Driver','cleaner']};
      this.fields.push(test);
      test={name:'drivinglicenceNo',id:'',type:'text',value:'',label:'Driving licence No',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:['option1','option2']};
      this.fields.push(test);
      test={name:'drivinglicenceExpiry',id:'',type:'date',value:'',label:'Driving licence Expiry',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:['option1','option2']};
      this.fields.push(test);
      test={name:'dLIssuingAuthority',id:'',type:'text',value:'',label:'DL Issuing Authority',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:['option1','option2']};
      this.fields.push(test);
       test={name:'badgeNo',id:'',type:'text',value:'',label:'Badge No',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:['option1','option2']};
      this.fields.push(test);
       test={name:'contactNumber',id:'',type:'text',value:'',label:'Contact Number',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:['option1','option2']};
      this.fields.push(test);
      test={name:'country',id:'',type:'select',value:'',label:'Country',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:['option1','option2']};
      this.fields.push(test);
      test={name:'state',id:'',type:'select',value:'',label:'State',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:['option1','option2']};
      this.fields.push(test);
      test={name:'city',id:'',type:'select',value:'',label:'City',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:['option1','option2']};
      this.fields.push(test);
      test={name:'pinNo',id:'',type:'text',value:'',label:'PIN No',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:['option1','option2']};
      this.fields.push(test);
      

      var test={name:'sEmailId',id:'sEmailId',type:'email',value:'',label:'Email Address',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.moreFields.push(test);
      test={name:'dateOfBirth',id:'dateOfBirth',type:'date',value:'',label:'Date Of Birth',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.moreFields.push(test);
      test={name:'joiningDate',id:'joiningDate',type:'date',value:'',label:'Joining Date',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.moreFields.push(test);
      test={name:'alternateNumber',id:'alternateNumber',type:'text',value:'',label:'Alternate Number',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.moreFields.push(test);
      test={name:'referredBy',id:'referredBy',type:'text',value:'',label:'Referred By',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.moreFields.push(test);
      test={name:'esiNumber',id:'esiNumber',type:'text',value:'',label:'ESI Number',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.moreFields.push(test);
      test={name:'pfNumber',id:'pfNumber',type:'text',value:'',label:'PF Number',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.moreFields.push(test);
      test={name:'oAddress',id:'oAddress',type:'text',value:'',label:'Office Address',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.moreFields.push(test);
      test={name:'rAddress',id:'rAddress',type:'text',value:'',label:'Residence Address',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.moreFields.push(test);
      test={name:'eStatus',id:'eStatus',type:'radio',value:'',label:'Employee Status',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:["Active","In-Active"]};
      this.moreFields.push(test);
      
//
      var test={name:'employeeName',id:'',type:'text',value:'',label:'Employee Name',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'Email Id',id:'',type:'text',value:'',label:'emailId',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:['option1','option2']};
      this.modalfields.push(test);
      test={name:'contactDetails',id:'',type:'text',value:'',label:'Contact Details',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test); 
      test={name:'employeeType',id:'Id',type:'text',label:'Employee Type',value:'',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'city',id:'Id',type:'text',label:'City',value:'',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'Id',id:'Id',type:'hidden',label:'',value:'',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'operation',id:'text',type:'hidden',label:'', value:'update', isRequired:false,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);

      var test={name:'sEmailId',id:'sEmailId',type:'email',value:'',label:'Email Address',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.editMoreFields.push(test);
      test={name:'dateOfBirth',id:'dateOfBirth',type:'date',value:'',label:'Date Of Birth',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.editMoreFields.push(test);
      test={name:'joiningDate',id:'joiningDate',type:'date',value:'',label:'Joining Date',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.editMoreFields.push(test);
      test={name:'alternateNumber',id:'alternateNumber',type:'text',value:'',label:'Alternate Number',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.editMoreFields.push(test);
      test={name:'referredBy',id:'referredBy',type:'text',value:'',label:'Referred By',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.editMoreFields.push(test);
      test={name:'esiNumber',id:'esiNumber',type:'text',value:'',label:'ESI Number',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.editMoreFields.push(test);
      test={name:'pfNumber',id:'pfNumber',type:'text',value:'',label:'PF Number',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.editMoreFields.push(test);
      test={name:'oAddress',id:'oAddress',type:'text',value:'',label:'Office Address',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.editMoreFields.push(test);
      test={name:'rAddress',id:'rAddress',type:'text',value:'',label:'Residence Address',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.editMoreFields.push(test);
      test={name:'eStatus',id:'eStatus',type:'radio',value:'',label:'Employee Status',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:["Active","In-Active"]};
      this.editMoreFields.push(test);

      

      test={name:'Id',id:'Id',type:'hidden', value:'', label:'',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.deletemodalfields.push(test);
      test={name:'status',id:'status',type:'hidden',label:'', value:'delete', isRequired:false,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.deletemodalfields.push(test);
      test={name:'operation',id:'text',type:'hidden',label:'', value:'update', isRequired:false,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.deletemodalfields.push(test);
      //this.getBranches();
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

   public editSelect(id:any)
  {
    this.manageService.getDatabyId("branches",id).subscribe((data)=>{this.selectedData=data});
  }




  getStatesData() 
  {
    this.manageService.getData("states").subscribe((data)=>{setTimeout(()=>{
    this.statesData=data;
      for(var i in this.statesData)
      {
        var statesRow={name:this.statesData[i].name,Id:this.statesData[i].Id}
        this.statesValues.push(statesRow);
        this.statesIds.push(this.statesData[i].name);
      }
    },2000)});
  }

  getCitiesData() 
  {
    this.manageService.getData("cities").subscribe((data)=>{setTimeout(()=>{
    this.citiesData=data;
      for(var i in this.citiesData)
      {
        var citiesRow={name:this.citiesData[i].name,Id:this.citiesData[i].Id}
        this.citiesValues.push(citiesRow);
        this.citiesIds.push(this.citiesData[i].name);
      }
    },2000)});
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



  showModal(){
      alert(this.data);
    //editModal.show()
  }

  onSubmit(form:NgForm) 
  {    
        alert(JSON.stringify(form.value));
        var stateid=form.value['stateId'];
        for(let stateval of  this.statesValues)
        {
          if(form.value.stateId==stateval.name)
          {
              form.value['stateId']= +stateval.Id;
          }
        }
        var cityid=form.value['cityId'];
        for(let cityval of  this.citiesValues)
        {
          if(form.value.cityId==cityval.name)
          {
              form.value['cityId']= +cityval.Id;
          }
        }
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
        // console.log(this.files); 
        //  this.sendValues("15","15");
        // this.manageService.addfile("15","15",this.filestring,this.file );
        this.manageService.add(form.value,"vehicleStaff");
  }
  
  onUpdate(upform:NgForm) 
  {  
      alert("in uoda");
      alert(JSON.stringify(upform.value));
       for(let field of this.modalfields)
      {
        if(field['type']=="date" || field['type']=="date range" )
        {
          var name=field["name"];
          var datee=upform.value[name] ;
          upform.value[name]=datee.formatted;

        }
      } 
       alert(JSON.stringify(upform.value));
      this.manageService.update(upform.value,"vehicleStaff");
  }
}
