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
export class VehicleComponent implements OnInit 
{
  fields:Field[]=[];
  theads:String[]=["Id","Registration Number","Engine Number","Chassis Number","Vehicle Manufacturer","Vehicle Type","TS Vehicle","Action"];
  modalfields:Field[]=[];
  editMoreFields:Field[]=[];
  moreFields:Field[]=[];
  deletemodalfields:Field[]=[];
  selectedBranch=null;
  loadAPI:Promise<any>;
   componentName="Local Vehicle"
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
  tfields=["Id","registrationNumber","engineNumber","chassisNumber","vehicleManufacturer","vehicleType","tsVehicle"];
  ngOnInit()
  {
     this.loadScript();
  }

   public data=
 [
    {Id:1,registrationNumber:'AP-07-TG-9699',vehicleManufacturer:'Tata',vehicleType:'Non A/c',tsVehicle:'AP-07-TB-7777',action:'show'},
    {Id:2,registrationNumber:'AP-07-TG-9699',vehicleManufacturer:'Tata',vehicleType:'Non A/c',tsVehicle:'AP-07-TB-7777',action:'show'},
  ];

  constructor(private router: Router,private manageService: ManageService,private http:Http,@Inject(Renderer) private renderer: Renderer) 
  {
    //   this.getStatesData();
    //   this.getCitiesData();
      var test={name:'registrationNumber',id:'',type:'text',value:'',label:'Registration Number',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.fields.push(test);
      test={name:'vehicleBrand',id:'',type:'text',value:'',label:'Vehicle Brand',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:['option1','option2']};
      this.fields.push(test);
      test={name:'ownership',id:'',type:'radio',value:'',label:'Ownership',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:['Own','Hire']};
      this.fields.push(test);
      test={name:'serviceType',id:'',type:'radio',value:'',label:'Service Type',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:['Bus','Track']};
      this.fields.push(test);

      var test={name:'ownerName',id:'ownerName',type:'text',value:'',label:'Owner Name',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.moreFields.push(test);
      test={name:'ownerAddress',id:'ownerAddress',type:'text',value:'',label:'Owner Address',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.moreFields.push(test);
      test={name:'panNumber',id:'panNumber',type:'text',value:'',label:'PAN Number',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.moreFields.push(test);
      test={name:'contactNumber',id:'contactNumber',type:'number',value:'',label:'Contact Number ',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.moreFields.push(test);
      test={name:'engineNumber',id:'engineNumber',type:'text',value:'',label:'Engine Number',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.moreFields.push(test);
      test={name:'chassisNumber',id:'chassisNumber',type:'text',value:'',label:'Chassis Number',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.moreFields.push(test);
      test={name:'manufactureYear',id:'manufactureYear',type:'date',value:'',label:'Manufacture Year',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.moreFields.push(test);
      test={name:'loadCapacity',id:'loadCapacity',type:'text',value:'',label:'Load Capacity(Ton)',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.moreFields.push(test);
      test={name:'weight',id:'weight',type:'text',value:'',label:'Weight',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.moreFields.push(test);
      test={name:'fitness',id:'fitness',type:'text',value:'',label:'Fitness',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.moreFields.push(test);
      test={name:'numberOfTyres',id:'numberOfTyres',type:'text',value:'',label:'Number Of Tyres',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.moreFields.push(test);
      test={name:'permitNumber',id:'permitNumber',type:'text',value:'',label:'Permit Number',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.moreFields.push(test);
      test={name:'permitExpiryDate',id:'permitExpiryDate',type:'date',value:'',label:'Permit Expiry Date',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.moreFields.push(test);
      test={name:'insurance',id:'insurance',type:'text',value:'',label:'Insurance',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.moreFields.push(test);
      test={name:'insurancePolicyNumber',id:'insurancePolicyNumber',type:'text',value:'',label:'Insurance Policy Number',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.moreFields.push(test);
      test={name:'insuranceExpiryDate',id:'insuranceExpiryDate',type:'date',value:'',label:'Insurance Expiry Date',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.moreFields.push(test);
      test={name:'fitnessExpiryDate',id:'fitnessExpiryDate',type:'date',value:'',label:'Fitness Expiry Date',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.moreFields.push(test);
      test={name:'taxExpiryDate',id:'taxExpiryDate',type:'date',value:'',label:'Tax Expiry Date',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.moreFields.push(test);
      test={name:'pollutionExpiryDate',id:'pollutionExpiryDate',type:'date',value:'',label:'Pollution Expiry Date',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.moreFields.push(test);
      test={name:'vehicleEmiAmount',id:'vehicleEmiAmount',type:'text',value:'',label:'Vehicle EMI Amount',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.moreFields.push(test);
      test={name:'emiDueDate',id:'emiDueDate',type:'date',value:'',label:'EMI Due Date',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.moreFields.push(test);
      test={name:'vStatus',id:'vStatus',type:'radio',value:'',label:'Vehicle Status',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:["Active","In-Active"]};
      this.fields.push(test);

      test={name:'registrationNumber',id:'',type:'text',value:'',label:'Registration Number',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'engineNumber',id:'',type:'text',value:'',label:'Engine Number',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'chassisNumber',id:'',type:'text',value:'',label:'Chassis Number ',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'vehicleManufacturer',id:'',type:'text',value:'',label:'Vehicle Manufacturer',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'vehicleType',id:'',type:'text',value:'',label:'Vehicle Type',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'tsVehicle',id:'',type:'text',value:'',label:'TS Vehicle',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test); 
      test={name:'Id',id:'Id',type:'hidden',label:'',value:'',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);

      test={name:'engineNumber',id:'engineNumber',type:'text',value:'',label:'Engine Number',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.editMoreFields.push(test);
      test={name:'chassisNumber',id:'chassisNumber',type:'text',value:'',label:'Chassis Number',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.editMoreFields.push(test);
      test={name:'manufactureYear',id:'manufactureYear',type:'date',value:'',label:'Manufacture Year',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.editMoreFields.push(test);
      test={name:'loadCapacity',id:'loadCapacity',type:'text',value:'',label:'Load Capacity(Ton)',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.editMoreFields.push(test);
      test={name:'numberOfTyres',id:'numberOfTyres',type:'text',value:'',label:'Number Of Tyres',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.editMoreFields.push(test);
      test={name:'permitNumber',id:'permitNumber',type:'text',value:'',label:'Permit Number',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.editMoreFields.push(test);
      test={name:'permitExpiryDate',id:'permitExpiryDate',type:'date',value:'',label:'Permit Expiry Date',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.editMoreFields.push(test);
      test={name:'insurancePolicyNumber',id:'insurancePolicyNumber',type:'date',value:'',label:'Insurance Policy Number',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.editMoreFields.push(test);
      test={name:'insuranceExpiryDate',id:'insuranceExpiryDate',type:'date',value:'',label:'Insurance Expiry Date',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.editMoreFields.push(test);
      test={name:'fitnessExpiryDate',id:'fitnessExpiryDate',type:'date',value:'',label:'Fitness Expiry Date',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.editMoreFields.push(test);
      test={name:'taxExpiryDate',id:'taxExpiryDate',type:'date',value:'',label:'Tax Expiry Date',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.editMoreFields.push(test);
      test={name:'pollutionExpiryDate',id:'pollutionExpiryDate',type:'date',value:'',label:'Pollution Expiry Date',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.editMoreFields.push(test);
      test={name:'vehicleEmiAmount',id:'vehicleEmiAmount',type:'text',value:'',label:'Vehicle EMI Amount',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.editMoreFields.push(test);
      test={name:'emiDueDate',id:'emiDueDate',type:'date',value:'',label:'EMI Due Date',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.editMoreFields.push(test);
      test={name:'vStatus',id:'vStatus',type:'radio',value:'',label:'Vehicle Status',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:["Active","In-Active"]};
      this.editMoreFields.push(test);


      test={name:'operation',id:'text',type:'hidden',label:'', value:'update', isRequired:false,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
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
        var selectedDate=form.value['cityId'];
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
        alert(JSON.stringify(form.value));
       this.manageService.add(form.value,"vehicles");
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
      this.manageService.update(upform.value,"vehicles");
  }
}
