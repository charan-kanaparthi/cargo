import { Component , OnInit,ViewChild,Inject,NgZone} from '@angular/core';
import { Headers, Http, RequestOptions  } from '@angular/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {Renderer} from  '@angular/core';
import { ManageService } from './manage.service';
import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';

const urls=[
        "assets/myscripts/init.js"
    ];

@Component({
  templateUrl: 'manage.component.html'
})


export class UsersComponent implements OnInit 
{
  fields:any[]=[];//form fields
  theads:String[]=[];//table heading fields
  modalfields:any[]=[]; //editmodal fields
  deletemodalfields:any[]=[]; //deletemodal fields
  loadAPI:Promise<any>;
  isForm=true;
  componentName="Users";//to display on the page
  tfields=["Id","fullName","gender","emailAddress","loginId","password"	,"designationRole",	"branchId",	"employeeId",	"contactNumber"	,"landline","country","cityId","stateId","pinCode","loadAllCounters","branchIncharge","inchargeHead","allowCounter"];//table fields
  private zone: NgZone;
  public statesIds:any[]=[];
  public statesValues:any[]=[];
  public statesData:any;
  public citiesIds:any[]=[];
  public citiesValues:any[]=[];
  public citiesData:any;
  public branchesIds:any[]=[];
  public branchesValues:any[]=[];
  public branchesData:any;
  private progress: number = 0;
  private response: any = {};
  public data:any[]=[];
  public selectedData=null;
  public file;
  sizeLimit = 2000000;
  moreFields:any[]=[];
  editMoreFields:any[]=[];
  
  ngOnInit()
  {
    this.getUsers();
    this.loadScript();
  }

  constructor(private router: Router ,private manageService: ManageService, private http:Http, @Inject(Renderer) private renderer: Renderer)
  {
      //form fields

      this.getStatesData();
      this.getCitiesData();
      this.getBranchesData();

      var test={name:'fullName',id:'fullName',  value:'',type:'text',label:'Full Name',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.fields.push(test);
      test={name:'gender',id:'gender',type:'radio',label:'Gender',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',value:"Male",options:["Male","Female"]};
      this.fields.push(test); 
      test={name:'emailAddress',id:'emailAddress',type:'email', value:'', label:'Email Address',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.fields.push(test);
      test={name:'loginId',id:'loginId',  value:'',type:'text',label:'Login Id',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.fields.push(test);
      test={name:'password',id:'password',  value:'',type:'password',label:'Password',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.fields.push(test);
      test={name:'password2',id:'password2',  value:'',type:'password',label:'Confirm Password',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.fields.push(test);
      test={name:'designationRole',id:'designationRole',type:'select',label:'Designation Role',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',value:"option1",options:["option1","option2"]};
      this.fields.push(test);
      test={name:'branchId',id:'branchId',type:'select',label:'Branch',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',value:this.branchesIds[0],options:this.branchesIds};
      this.fields.push(test);
      test={name:'employeeId',id:'employeeId',value:'',type:'text',label:'Employee Id',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.fields.push(test);
      test={name:'contactNumber',id:'contactNumber',type:'text',label:'Contact Number',value:"",isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.fields.push(test);
      test={name:'landline',id:'landline',type:'text',label:'Landline Number',value:"",isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.fields.push(test);
      test={name:'country',id:'country',type:'select',label:'Country',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',value:"India",options:["India","China"]};
      this.fields.push(test);
      test={name:'stateId',id:'stateId',type:'select',label:'State',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',value:this.statesIds[0],options:this.statesIds};
      this.fields.push(test);
      test={name:'cityId',id:'cityId',type:'select',label:'City',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',value:this.citiesIds[0],options:this.citiesIds};
      this.fields.push(test);
      test={name:'pinCode',id:'pinCode',  value:'',type:'text',label:'Pin Code',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.fields.push(test);
      test={name:'allowCounter',id:'allowCounter',type:'checkbox',label:'Allow Counter',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',value:"",options:null};
      this.fields.push(test);
      test={name:'loadAllCounters',id:'loadAllCounters',type:'checkbox',label:'Load All Counters',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',value:"",options:null};
      this.fields.push(test);
      test={name:'branchIncharge',id:'branchIncharge',type:'checkbox',label:'Branch Incharge',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',value:"",options:null};
      this.fields.push(test);
      test={name:'inchargeHead',id:'inchargeHead',type:'checkbox',label:'Incharge Head',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',value:"",options:null};
      this.fields.push(test);
      // test={name:'date',id:'date',type:'date',label:'Date',value:"",isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      // this.fields.push(test);
      // test={name:'file',id:'file',type:'file',label:'File',value:"",isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      // this.fields.push(test);
      // test={name:'radio',id:'radio',type:'radio',label:'Radio',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',value:"option1",options:["option1","option2","option3"]};
      // this.fields.push(test);
      // test={name:'name',id:'name',type:'checkbox',label:'Checkbox',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',value:"",options:["option1","option2","option3"]};
      // this.fields.push(test);


      test={name:'dateOfBirth',id:'dateOfBirth',type:'date',value:'',label:'Date Of Birth',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.moreFields.push(test);
      test={name:'residenceNumber',id:'residenceNumber',type:'text',value:'',label:'Residence Number',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.moreFields.push(test);
      test={name:'officeNumber',id:'officeNumber',type:'text',value:'',label:'Office Number',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.moreFields.push(test);
      test={name:'rAddress',id:'rAddress',type:'text',value:'',label:'Residence Address',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.moreFields.push(test);
      test={name:'joiningDate',id:'joiningDate',type:'date',value:'',label:'Joining Date',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.moreFields.push(test);
      test={name:'idProofType',id:'idProofType',type:'select',label:'Id Proof Type',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',value:"option1",options:["option1","option2"]};
      this.moreFields.push(test);
      test={name:'idProofNumber',id:'idProofNumber',type:'text',value:'',label:'Id ProofNumber',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.moreFields.push(test);
      test={name:'previousCompany',id:'previousCompany',type:'text',value:'',label:'Previous Company',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.moreFields.push(test);
      test={name:'yearsOfExperience',id:'yearsOfExperience',type:'text',value:'',label:'Years Of Experience',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.moreFields.push(test);
      test={name:'eStatus',id:'eStatus',type:'radio',value:'',label:'Employee Status',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:["Active","In-Active"]};
      this.moreFields.push(test);

      test={name:'fullName',id:'fullName',  value:'',type:'text',label:'Full Name',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'gender',id:'gender',type:'radio',label:'Gender',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',value:"Male",options:["Male","Female"]};
      this.modalfields.push(test); 
      test={name:'emailAddress',id:'emailAddress',type:'email', value:'', label:'Email Address',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'loginId',id:'loginId',  value:'',type:'text',label:'Login Id',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'password',id:'password',  value:'',type:'password',label:'Password',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'password2',id:'password2',  value:'',type:'password',label:'Confirm Password',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'designationRole',id:'designationRole',type:'select',label:'Designation Role',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',value:"option1",options:["option1","option2"]};
      this.modalfields.push(test);
      test={name:'branchId',id:'branchId',type:'select',label:'Branch',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',value:"",options:this.branchesIds};
      this.modalfields.push(test);
      test={name:'employeeId',id:'employeeId',value:'',type:'text',label:'Employee Id',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'contactNumber',id:'contactNumber',type:'text',label:'Contact Number',value:"",isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'landline',id:'landline',type:'text',label:'Landline Number',value:"",isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'country',id:'country',type:'select',label:'Country',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',value:"India",options:["India","China"]};
      this.modalfields.push(test);
      test={name:'stateId',id:'stateId',type:'select',label:'State',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',value:"",options:this.statesIds};
      this.modalfields.push(test);
      test={name:'cityId',id:'cityId',type:'select',label:'City',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',value:"",options:this.citiesIds};
      this.modalfields.push(test);
      test={name:'pinCode',id:'pinCode',  value:'',type:'text',label:'Pin Code',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'allowCounter',id:'allowCounter',type:'checkbox',label:'Allow Counter',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',value:"",options:null};
      this.modalfields.push(test);
      test={name:'loadAllCounters',id:'loadAllCounters',type:'checkbox',label:'Load All Counters',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',value:"",options:null};
      this.modalfields.push(test);
      test={name:'branchIncharge',id:'branchIncharge',type:'checkbox',label:'Branch Incharge',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',value:"",options:null};
      this.modalfields.push(test);
      test={name:'inchargeHead',id:'inchargeHead',type:'checkbox',label:'Incharge Head',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',value:"",options:null};
      this.modalfields.push(test);

      test={name:'dateOfBirth',id:'dateOfBirth',type:'date',value:'',label:'Date Of Birth',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.editMoreFields.push(test);
      test={name:'residenceNumber',id:'residenceNumber',type:'text',value:'',label:'Residence Number',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.editMoreFields.push(test);
      test={name:'officeNumber',id:'officeNumber',type:'text',value:'',label:'Office Number',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.editMoreFields.push(test);
      test={name:'rAddress',id:'rAddress',type:'text',value:'',label:'Residence Address',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.editMoreFields.push(test);
      test={name:'joiningDate',id:'joiningDate',type:'date',value:'',label:'Joining Date',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.editMoreFields.push(test);
      test={name:'idProofType',id:'idProofType',type:'select',label:'Id Proof Type',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',value:"option1",options:["option1","option2"]};
      this.fields.push(test);
      test={name:'idProofNumber',id:'idProofNumber',type:'text',value:'',label:'Id ProofNumber',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.editMoreFields.push(test);
      test={name:'previousCompany',id:'previousCompany',type:'text',value:'',label:'Previous Company',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.editMoreFields.push(test);
      test={name:'yearsOfExperience',id:'yearsOfExperience',type:'text',value:'',label:'Years Of Experience',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.editMoreFields.push(test);
      test={name:'eStatus',id:'eStatus',type:'radio',value:'',label:'Employee Status',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:["Active","In-Active"]};
      this.editMoreFields.push(test);
      
      
      
      test={name:'Id',id:'Id',type:'hidden', value:'', label:'',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.deletemodalfields.push(test);
      test={name:'status',id:'status',type:'hidden',label:'', value:'deleted', isRequired:false,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.deletemodalfields.push(test);
      test={name:'operation',id:'text',type:'hidden',label:'', value:'update', isRequired:false,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.deletemodalfields.push(test);

      this.theads.push("Id","Full Name","Gender","Email Address","Login Id","Password","Designation Role","Branch Id","Employee Id","Contact Number","Landline","Country","City Id","State Id","Pin Code","Load AllCounters","Branch Incharge","Incharge Head","Allow Counter","Action");

  }
   uploadFile: any;
  hasBaseDropZoneOver: boolean = false;
  options: Object = 
  {
    url: 'http://http://172.16.32.54/project/public/uploads'
  };
  
 
  handleUpload(data): void 
  {
    if (data && data.response) 
    {
      data = JSON.parse(data.response);
      this.uploadFile = data;
    }
  }
 
  fileOverBase(e:any):void 
  {
    this.hasBaseDropZoneOver = e;
  }
 
  beforeUpload(uploadingFile): void 
  {
    if (uploadingFile.size > this.sizeLimit) 
    {
      uploadingFile.setAbort();
      alert('File is too large');
    }
  }
     public dateSelect(event)
     {
     }

     files: FileList; 
     filestring: string; 

      getFiles(event) 
      { 
        this.files = event.target.files; 
        var reader = new FileReader(); 
        let file : File = this.files.item(0);
        this.file = file.name;
        reader.onload = this._handleReaderLoaded.bind(this); 
        reader.readAsBinaryString(this.files[0]); 
    } 
 
    _handleReaderLoaded(readerEvt) 
    { 
        var binaryString = readerEvt.target.result; 
        this.filestring = btoa(binaryString); 
        console.log(this.filestring); // Converting binary string data. 
    } 
  

  public onSelect(id:any)
  { 
    this.deletemodalfields[0].value=id;
  }

   public editSelect(id:any)
  {
    this.manageService.getDatabyId("users",id).subscribe((data)=>{
    this.selectedData=data;
    for( var i in this.modalfields)
     {
        if(this.modalfields[i].name=="stateId")
        {
          for(var j in this.statesValues)
          {
            if(this.statesValues[j]['Id']==this.selectedData[0]['stateId'])
            {
               this.modalfields[i].value=this.statesValues[j]['name'];
            }

          }
       }
        if(this.modalfields[i].name=="cityId")
        {
          for(var j in this.citiesValues)
          {
            if(this.citiesValues[j]['Id']==this.selectedData[0]['cityId'])
            {
               this.modalfields[i].value=this.citiesValues[j]['name'];
            }

          }
       }
     }
    });
  }

  getUsers() 
  {
    this.manageService.getData("users").subscribe((data)=>{setTimeout(()=>{this.data=data},2000)});
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

  getBranchesData() 
  {
    this.manageService.getData("branches").subscribe((data)=>{setTimeout(()=>{
    this.branchesData=data;
      for(var i in this.branchesData)
      {
        var branchesRow={name:this.branchesData[i].name,Id:this.branchesData[i].Id}
        this.branchesValues.push(branchesRow);
        this.branchesIds.push(this.branchesData[i].name);
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

  public items:Array<string> = ['Hyderabad','Chennai','Bengaluru','Vizag','Kakinada'];

  public value:any = ['Hyderabad'];

  public selected(value:any):void 
  {
    console.log('Selected value is: ', value);
  }

  public removed(value:any):void 
  {
    console.log('Removed value is: ', value);
  }

  public refreshValue(value:any):void 
  {
    this.value = value;
  }
  public itemsToString(value:Array<any> = []):string 
  {
    return value
      .map((item:any) => 
      {
        return item.text;
      }).join(',');
  }
 
  onSubmit(form:NgForm) 
  { 
      alert(JSON.stringify(form.value));
      var stateid=form.value['stateId'];
      for(let stateval of this.statesValues)
      {
        if(form.value.stateId==stateval.name)
        {
            form.value['stateId']= +stateval.Id;
        }
      }
      var cityid=form.value['cityId'];
      for(let cityval of this.citiesValues)
      {
        if(form.value.cityId==cityval.name)
        {
            form.value['cityId']= +cityval.Id;
        }
      }
      var branchval=form.value['branchId'];
      for(let branchval of this.branchesValues)
      {
        if(form.value.branch==branchval.name)
        {
            form.value['branchId']= +branchval.Id;
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
      this.manageService.add(form.value,"users");
  }
  
  onUpdate(form:NgForm) 
  {  
      alert(JSON.stringify(form.value));
       var stateid=form.value['stateId'];
      for(let stateval of this.statesValues)
      {
        if(form.value.stateId==stateval.name)
        {
            form.value['stateId']= +stateval.Id;
        }
      }
      var cityid=form.value['cityId'];
      for(let cityval of this.citiesValues)
      {
        if(form.value.cityId==cityval.name)
        {
            form.value['cityId']= +cityval.Id;
        }
      }
      var branchval=form.value['branchId'];
      for(let branchval of this.branchesValues)
      {
        if(form.value.branch==branchval.name)
        {
            form.value['branchId']= +branchval.Id;
        }
      }
       for(let field of this.modalfields)
      {
        if(field['type']=="date" || field['type']=="date range" )
        {
          var name=field["name"];
          var datee=form.value[name] ;
          form.value[name]=datee.formatted;

        }
      } 
       alert(JSON.stringify(form.value));
      this.manageService.update(form.value,"users");
  }
}
