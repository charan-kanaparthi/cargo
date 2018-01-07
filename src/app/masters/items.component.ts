import { Component , OnInit,Renderer,ViewChild,Inject,NgZone} from '@angular/core';
import { Headers, Http, RequestOptions  } from '@angular/http';
import { NgForm } from '@angular/forms';
import { Router }  from '@angular/router';
import { MastersService } from './masters.service';
import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';
// import {UPLOAD_DIRECTIVES} from 'ng2-file-uploader/ng2-file-uploader';

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
  value:any;
  constructor(name:string,id:string,type:string,label:string,isRequired:boolean,isReadOnly:boolean,isSelected:boolean,className:string,value:string)
  {
    this.name=name;
    this.id=id;
    this.type=type;
    this.label=label;
    this.isRequired=isRequired;
    this.isReadOnly=isReadOnly;
    this.isSelected=isSelected;
    this.className=className;
    this.value=value;
  }
}

const urls=[
        "assets/myscripts/init.js"
    ];


 
@Component({
  templateUrl: 'masters.component.html',
 
})
export class ItemsComponent implements OnInit 
{
  fields:Field[]=[];//form fields
  theads:String[]=[];//table heading fields
  modalfields:Field[]=[]; //editmodal fields
  deletemodalfields:Field[]=[]; //deletemodal fields
  selectedItem=null;
  loadAPI:Promise<any>;
  componentName="Items";//to display on the page
  isForm=true;
  tfields=["Id","name","code","itemCategoryId","priority"];//table fields
  private zone: NgZone;
  public itemCategoryIds:any[]=[];
  public itemCategoryValues:any[]=[];
  private progress: number = 0;
  private response: any = {};
  public data:any;
  public itemCategoryData:any;
  public file;
  sizeLimit = 2000000;
  ngOnInit()
  {
     this.loadScript();
  } 

  constructor(private router: Router,private mastersService: MastersService,private http:Http,@Inject(Renderer) private renderer: Renderer) 
  {

      this.getItems();
      this.getItemsCategory();

      //form fields
      test={name:'name',id:'name',  value:'',type:'text',label:'Name',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.fields.push(test);
      test={name:'code',id:'code',type:'text', value:'', label:'Code',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.fields.push(test);
      test={name:'itemCategoryId',id:'itemCategoryId',type:'select',label:'Category',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',value:this.itemCategoryIds[0],options:this.itemCategoryIds};
      this.fields.push(test);
      test={name:'priority',id:'priority',type:'radio',label:'Priority',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',value:"option1",options:["option1","option2","option3"]};
      this.fields.push(test);
      // test={name:'date',id:'date',type:'date',label:'Date',value:"",isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      // this.fields.push(test);
      // test={name:'file',id:'file',type:'file',label:'File',value:"",isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      // this.fields.push(test);
      // test={name:'name',id:'name',type:'checkbox',label:'Checkbox',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',value:"",options:["option1","option2","option3"]};
      // this.fields.push(test);
      

       //editmodal fields
      var test={name:'name',id:'name', value:'',type:'text',label:'Name',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'code',id:'code',type:'text', value:'', label:'Code',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'Id',id:'Id',type:'hidden', value:'', label:'',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'operation',id:'text',type:'hidden',label:'', value:'update', isRequired:false,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'itemCategoryId',id:'itemCategoryId',type:'select',label:'Category',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',value:"",options:this.itemCategoryIds};
      this.modalfields.push(test);
      test={name:'priority',id:'priority',type:'radio',label:'Priority',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',value:"",options:["first","second","third"]};
      this.modalfields.push(test);
      
      
      //deletemodal fields
      test={name:'Id',id:'Id',type:'hidden', value:'', label:'',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.deletemodalfields.push(test);
      test={name:'status',id:'status',type:'hidden',label:'', value:'deleted', isRequired:false,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.deletemodalfields.push(test);
      test={name:'operation',id:'text',type:'hidden',label:'', value:'update', isRequired:false,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.deletemodalfields.push(test);

      //table heading fields
      this.theads.push('Id','Name','Code','Item Category ID','Priority','Action');

  }
  
  private myOptions: INgxMyDpOptions = 
  {
        // other options...
        dateFormat: 'yyyy-mm-dd',
  };
    private model: Object = { date: { year: 2017, month: 1, day: 1 } };

    onDateChanged(event: IMyDateModel): void 
    {
        // date selected
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
  
  public onSelect(item:any)
  { 
     this.selectedItem=item; 
      for( var i in this.modalfields){
        if(this.modalfields[i].name=="name"){
          this.modalfields[i].value=this.selectedItem.name;
        }
        if(this.modalfields[i].name=="code"){
          this.modalfields[i].value=this.selectedItem.code;
        }
        if(this.modalfields[i].name=="itemCategoryId"){
          alert(this.selectedItem.itemCategoryId);
          for(var j in  this.itemCategoryValues)
          {
            if(this.itemCategoryValues[j]['Id']==this.selectedItem.itemCategoryId)
            {
               this.modalfields[i].value=this.itemCategoryValues[j]['name'];
            }

          }
        }
        if(this.modalfields[i].name=="priority"){
          this.modalfields[i].value=this.selectedItem.priority;
        }
          if(this.modalfields[i].name=="Id"){
            this.modalfields[i].value=this.selectedItem.Id;
            this.deletemodalfields[0].value=this.selectedItem.Id;
           }

    }
  }


    
  getItems() 
  {
    this.mastersService.getData("items").subscribe((data)=>{setTimeout(()=>{this.data=data;},2000)});
  }

   getItemsCategory() 
  {
    this.mastersService.getData("item_categories").subscribe((data)=>{setTimeout(()=>{
    this.itemCategoryData=data;
      for(var i in this.itemCategoryData)
      {
        var itemCategoryRow={name:this.itemCategoryData[i].name,Id:this.itemCategoryData[i].Id}
        this.itemCategoryValues.push(itemCategoryRow);
        this.itemCategoryIds.push(this.itemCategoryData[i].name);
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
     // console.log(this.files); 
      //  this.sendValues("15","15");
    //  this.mastersService.addfile("15","15",this.filestring,this.file );
    
    var itemcatid=form.value['itemCategoryId'];

    for(let itemcatval of  this.itemCategoryValues)
    {
       if(form.value.itemCategoryId==itemcatval.name)
       {
          form.value['itemCategoryId']= +itemcatval.Id;
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
    this.mastersService.add(form.value,"items");
    
  }
  
  onUpdate(upform:NgForm) 
  {  
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
      this.mastersService.update(upform.value,"items");
  }

}
