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
export class LocalVehiclesComponent implements OnInit 
{
  fields:Field[]=[];
  theads:String[]=["Id","Registration Number","Engine Number","Chassis Number","Vehicle Manufacturer","Vehicle Type","Action"];;
  modalfields:Field[]=[];
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
  tfields=["Id","registrationNumber","engineNumber","chassisNumber","vehicleManufacturer","vehicleType"];
  ngOnInit()
  {
     this.loadScript();
  }

   public data=
 [
    {Id:1,registrationNumber:'AP-07-TG-9699',vehicleManufacturer:'Tata',vehicleType:'Non A/c',action:'show'},
    {Id:2,registrationNumber:'AP-07-TG-9699',vehicleManufacturer:'Tata',vehicleType:'Non A/c',action:'show'},
  ];

  constructor(private router: Router,private manageService: ManageService,private http:Http,@Inject(Renderer) private renderer: Renderer) 
  {
    //   this.getStatesData();
    //   this.getCitiesData();
      var test={name:'registrationNumber',id:'',type:'text',value:'',label:'Registration Number',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.fields.push(test);
      test={name:'vehicleBrand',id:'',type:'text',value:'',label:'Vehicle Brand',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:['option1','option2']};
      this.fields.push(test);
      test={name:'City',id:'',type:'number',value:'',label:'City',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
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
      test={name:'Id',id:'Id',type:'hidden',label:'',value:'',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);

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
