import { Component , OnInit,Renderer,ViewChild,Inject,NgZone} from '@angular/core';
import { Headers, Http, RequestOptions  } from '@angular/http';
import { NgForm } from '@angular/forms';
import { Router , ActivatedRoute }  from '@angular/router';
import { MastersService } from './masters.service';
import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';
// import {UPLOAD_DIRECTIVES} from 'ng2-file-uploader/ng2-file-uploader';
const urls=["assets/myscripts/init.js"];

@Component({
  templateUrl: 'edit_tabularPanel.component.html'
})
export class EditTabularPanelComponent implements OnInit 
{
  fields:any[]=[];//form fields
  loadAPI:Promise<any>;
  tabs:any[]=[];
  tabnames=['First','Second'];
  isForm=true;
  private zone: NgZone;
  private progress: number = 0;
  private response: any = {};
  public data=[{name:"Hyderabad",code:"hyd",select:"option3",radio:"option2",checkbox:"option1"}];
  public file;
  public sId;
  sizeLimit = 2000000;
  
  ngOnInit()
  {
     this.loadScript();
  } 

  constructor(private router: Router,private mastersService: MastersService,private http:Http,@Inject(Renderer) private renderer: Renderer,public activatedRoute:ActivatedRoute) 
  {
      this.sId=this.activatedRoute.snapshot.params['id'];
      this.getData();
      //form fields
      var test={name:'name',id:'name',value:'',type:'text',label:'Name',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.fields.push(test);
      test={name:'code',id:'code',type:'text', value:'', label:'Code',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.fields.push(test);
      this.tabs.push(this.fields);

      this.fields=[];
      test={name:'select',id:'select',type:'select',label:'Select',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',value:"option1",options:["option1","option2","option3"]};
      this.fields.push(test);
      test={name:'radio',id:'radio',type:'radio',label:'Radio',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',value:"option1",options:["option1","option2","option3"]};
      this.fields.push(test);
      test={name:'checkbox',id:'checkbox',type:'checkbox',label:'Checkbox',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',value:"option1",options:["option1","option2","option3"]};
      this.fields.push(test);
      this.tabs.push(this.fields);
  }
  
  private myOptions: INgxMyDpOptions = 
  {
        // other options...
        dateFormat: 'yyyy-mm-dd',
  };
  private model: Object = { date: { year: 2017, month: 1, day: 1 } };
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

   public getData()
   {
    //  this.mastersService.getDatabyId("states",this.sId).subscribe((data)=>{this.data=data});
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
    //   this.mastersService.update(form.value,"");
  }

}
