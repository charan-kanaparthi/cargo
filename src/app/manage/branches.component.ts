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
  templateUrl: 'manage.component.html'
})
export class BranchesComponent implements OnInit 
{
  fields:Field[]=[];
  moreFields:Field[]=[];
  theads:String[]=[];
  modalfields:Field[]=[];
  deletemodalfields:Field[]=[];
  selectedBranch=null;
  loadAPI:Promise<any>;
  public data:any[]=[];
  public selectedData:any[]=[];
  public file;
  public statesIds:any[]=[];
  public statesValues:any[]=[];
  public statesData:any;
  public citiesIds:any[]=[];
  public citiesValues:any[]=[];
  public citiesData:any;
  editMoreFields:Field[]=[];
  isForm=true;
  tfields=["Id","name","code","contactNumber","landline","alternateLandline","country","stateId","cityId","defaultLRType","pinCode","booking","delivery","hub","allowCounter","status"];
  ngOnInit()
  {
     this.loadScript();
  }

//    public data=
//  [
//     {Id:1,name:"AP",code:"AP"},
//     {Id:2,name:"TN",code:"T"},
//     {Id:3,name:"AP",code:"A"},
//     {Id:4,name:"KN",code:"K"},
//     {Id:5,name:"HP",code:"H"},
//     {Id:6,name:"UP",code:"U"},
//     {Id:7,name:"AP",code:"AP"},
//     {Id:8,name:"TN",code:"T"},
//     {Id:9,name:"AP",code:"A"},
//     {Id:10,name:"KN",code:"K"},
//     {Id:11,name:"HP",code:"H"},
//     {Id:12,name:"UP",code:"U"},
//     {Id:13,name:"AP",code:"AP"},
//     {Id:14,name:"TN",code:"T"},
//     {Id:15,name:"AP",code:"A"},
//     {Id:16,name:"KN",code:"K"},
//     {Id:17,name:"HP",code:"H"},
//     {Id:18,name:"UP",code:"U"},
//   ];

  constructor(private router: Router,private manageService: ManageService,private http:Http,@Inject(Renderer) private renderer: Renderer) 
  {
      this.getStatesData();
      this.getCitiesData();
      var test={name:'name',id:'name',type:'text',value:'',label:'Branch Name',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.fields.push(test);
      test={name:'code',id:'code',type:'text',value:'',label:'Branch Code',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.fields.push(test);
      test={name:'contactNumber',id:'contactNumber',type:'number',value:'',label:'Contact Number ',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.fields.push(test);
      test={name:'landline',id:'landline',type:'number',value:'',label:'Landline Number',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.fields.push(test);
      test={name:'alternateLandline',id:'alternateLandline',type:'number',value:'',label:'Alternate Landline Number',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.fields.push(test);
      test={name:'country',id:'country',value:'',type:'select',label:'Country',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:["India","China","Japan"]};
      this.fields.push(test);
      test={name:'stateId',id:'stateId',type:'select',label:'State',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',value:this.statesIds[0],options:this.statesIds};
      this.fields.push(test);
      test={name:'cityId',id:'cityId',type:'select',label:'City',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',value:this.citiesIds[0],options:this.citiesIds};
      this.fields.push(test);
      test={name:'defaultLRType',id:'defaultLRType',type:'select',value:'',label:'Default LR type',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:["option1","option2","option3"]};
      this.fields.push(test);
      test={name:'pinCode',id:'pinCode',type:'text',value:'',label:'Pincode',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.fields.push(test);
      test={name:'booking',id:'booking',type:'radio',value:'',label:'Cargo Booking Allowed',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:["Yes","No"]};
      this.fields.push(test);
      test={name:'delivery',id:'delivery',type:'radio',value:'',label:'Cargo Delivery Allowed',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:["Yes","No"]};
      this.fields.push(test);
      test={name:'hub',id:'hub',type:'radio',value:'',label:'Is a Hub/Ware house',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:["Yes","No"]};
      this.fields.push(test);
      test={name:'allowCounter',id:'allowCounter',type:'checkbox',value:'',label:'Is Allow Counter',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:[""]};
      this.fields.push(test);

      var test={name:'bEmailId',id:'bEmailId',type:'email',value:'',label:'Email Address',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.moreFields.push(test);
      test={name:'alternateNumber',id:'alternateNumber',type:'text',value:'',label:'Alternate Number',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.moreFields.push(test);
      test={name:'faxNumber',id:'faxNumber',type:'text',value:'',label:'Fax Number',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.moreFields.push(test);
      test={name:'bAddress',id:'bAddress',type:'text',value:'',label:'Branch Address',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.moreFields.push(test);
      test={name:'bStatus',id:'bStatus',type:'radio',value:'',label:'Branch Status',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:["Active","In-Active"]};
      this.moreFields.push(test);

      test={name:'name',id:'name',type:'text',value:'',label:'Branch Name',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'code',id:'code',type:'text',value:'',label:'Branch Code',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'contactNumber',id:'contactNumber',type:'number',value:'',label:'Contact Number ',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'landline',id:'landline',type:'number',value:'',label:'Landline Number',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'alternateLandline',id:'alternateLandline',type:'number',value:'',label:'Alternate Landline Number',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'country',id:'country',value:'',type:'select',label:'Country',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:["India","China","Japan"]};
      this.modalfields.push(test);
      test={name:'stateId',id:'stateId',type:'select',label:'State',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',value:this.statesIds[0],options:this.statesIds};
      this.modalfields.push(test);
      test={name:'cityId',id:'cityId',type:'select',label:'City',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',value:this.citiesIds[0],options:this.citiesIds};
      this.modalfields.push(test);
      test={name:'defaultLRType',id:'defaultLRType',type:'select',value:'',label:'Default LR type',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:["option1","option2","option3"]};
      this.modalfields.push(test);
      test={name:'pinCode',id:'pinCode',type:'text',value:'',label:'Pincode',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'booking',id:'booking',type:'radio',value:'',label:'Cargo Booking Allowed',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:["Yes","No"]};
      this.modalfields.push(test);
      test={name:'delivery',id:'delivery',type:'radio',value:'',label:'Cargo Delivery Allowed',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:["Yes","No"]};
      this.modalfields.push(test);
      test={name:'hub',id:'hub',type:'radio',value:'',label:'Is a Hub/Ware house',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:["Yes","No"]};
      this.modalfields.push(test);
      test={name:'allowCounter',id:'allowCounter',type:'checkbox',value:'',label:'Is Allow Counter',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:[""]};
      this.modalfields.push(test);
      test={name:'Id',id:'Id',type:'hidden',label:'',value:'',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);

      var test={name:'bEmailId',id:'bEmailId',type:'email',value:'',label:'Email Address',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.editMoreFields.push(test);
      test={name:'alternateNumber',id:'alternateNumber',type:'text',value:'',label:'Alternate Number',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.editMoreFields.push(test);
      test={name:'faxNumber',id:'faxNumber',type:'text',value:'',label:'Fax Number',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.editMoreFields.push(test);
      test={name:'bAddress',id:'bAddress',type:'text',value:'',label:'Branch Address',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.editMoreFields.push(test);
      test={name:'bStatus',id:'bStatus',type:'radio',value:'',label:'Branch Status',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:["Active","In-Active"]};
      this.editMoreFields.push(test);

      test={name:'operation',id:'text',type:'hidden',label:'', value:'update', isRequired:false,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'Id',id:'Id',type:'hidden', value:'', label:'',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.deletemodalfields.push(test);
      test={name:'status',id:'status',type:'hidden',label:'', value:'delete', isRequired:false,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.deletemodalfields.push(test);
      test={name:'operation',id:'text',type:'hidden',label:'', value:'update', isRequired:false,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.deletemodalfields.push(test);
      this.theads.push('BranchId','Branch Name','Branch Code','Contact Number','Landline','Alternate Landline','Country','StateId','CityId','Default LR Type','Pincode','Booking','Delivery','Hub/Ware','Allow Counter','Branch Status','Action');	
      this.getBranches();
  }

  
  public onSelect(item:any)
  { 
     this.selectedBranch=item; 
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
  }

   public editSelect(id:any)
  {
    this.manageService.getDatabyId("branches",id).subscribe((data)=>{this.selectedData=data});
  }


  getBranches() 
  {
    this.manageService.getData("branches").subscribe((data)=>{setTimeout(()=>{
      this.data=data;
      alert(this.data[0].name);
    }, 2000)});
  }
  isShow=false;
  showDetails="More Details";
  onshow()
  {
      if(this.isShow){
        this.showDetails="Hide Details";
      }
      else{
        this.showDetails="More Details";
      }

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
        // console.log(this.files); 
        //  this.sendValues("15","15");
        // this.manageService.addfile("15","15",this.filestring,this.file );
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
        this.manageService.add(form.value,"branches");
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
      this.manageService.update(upform.value,"branches");
  }
}
