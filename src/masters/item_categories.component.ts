import { Component , OnInit,Renderer,ViewChild,Inject,NgZone} from '@angular/core';
import { Headers, Http, RequestOptions  } from '@angular/http';
import { NgForm } from '@angular/forms';
import { Router }  from '@angular/router';
import { MastersService } from './masters.service';
import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';

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

const urls=["assets/myscripts/init.js"];


 
@Component({
  templateUrl: 'masters.component.html',
 
})
export class Item_CategoriesComponent implements OnInit 
{
  fields:Field[]=[];//form fields
  theads:String[]=[];//table heading fields
  modalfields:Field[]=[]; //editmodal fields
  deletemodalfields:Field[]=[]; //deletemodal fields
  selectedItem=null;
  loadAPI:Promise<any>;
  isForm=true;
  componentName="Item Categories";//to display on the page
  tfields=["Id","name","code"];//table fields
  private zone: NgZone;
  private progress: number = 0;
  private response: any = {};
  public data=null;
  public file;
  sizeLimit = 2000000;

  ngOnInit()
  {
     this.getStates();
     this.loadScript();
  } 

  constructor(private router: Router,private mastersService: MastersService,private http:Http,@Inject(Renderer) private renderer: Renderer) 
  {
      
      //form fields
      var test={name:'name',id:'name',value:'',type:'text',label:'Name',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.fields.push(test);
      test={name:'description',id:'description',type:'text', value:'', label:'Description',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.fields.push(test);
      // test={name:'date',id:'date',type:'date',label:'Date',value:"",isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      // this.fields.push(test);
      // test={name:'file',id:'file',type:'file',label:'File',value:"",isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      // this.fields.push(test);
      // test={name:'select',id:'select',type:'select',label:'Select',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',value:"option1",options:["option1","option2","option3"]};
      // this.fields.push(test);
      // test={name:'radio',id:'radio',type:'radio',label:'Radio',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',value:"option1",options:["option1","option2","option3"]};
      // this.fields.push(test);
      // test={name:'name',id:'name',type:'checkbox',label:'Checkbox',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',value:"",options:["option1","option2","option3"]};
      // this.fields.push(test);

       //editmodal fields
      test={name:'name',id:'name',type:'text',value:'',label:'Name',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'description',id:'description',type:'text',value:'',label:'Description',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.modalfields.push(test);
      test={name:'Id',id:'Id',type:'hidden',label:'',value:'',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
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

      //table fields
      this.theads.push('id','name','code','action');
  }
  
  private myOptions: INgxMyDpOptions = 
  {
        // other options...
        dateFormat: 'dd.mm.yyyy',
  };

    // Initialized to specific date (09.10.2018)
    private model: Object = { date: { year: 2018, month: 10, day: 9 } };

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
      for( var i in this.modalfields)
      {
        if(this.modalfields[i].name=="name")
        {
          this.modalfields[i].value=this.selectedItem.name;
        }
         if(this.modalfields[i].name=="Description")
        {
          this.modalfields[i].value=this.selectedItem.Description;
        }
        if(this.modalfields[i].name=="Id")
        {
          this.modalfields[i].value=this.selectedItem.Id;
          this.deletemodalfields[0].value=this.selectedItem.Id;
        }
     }
  }
  getStates() 
  {
    this.mastersService.getData("states").subscribe((data)=>{setTimeout(()=>{this.data=data}, 2000)});
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
      console.log(this.files); 
      //this.mastersService.addfile("15","15",this.filestring,this.file );
      this.mastersService.add(form.value,"item_categories");
  }
  
  onUpdate(upform:NgForm) 
  {  
      //this.selectedItem=state;
      alert(JSON.stringify(upform.value));
      this.mastersService.update(upform.value,"item_categories");
  }

}
