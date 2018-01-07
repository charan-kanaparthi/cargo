import { Component , OnInit,Renderer,ViewChild,Inject,NgZone} from '@angular/core';
import { Headers, Http, RequestOptions  } from '@angular/http';
import { NgForm } from '@angular/forms';
import { Router , ActivatedRoute }  from '@angular/router';
import { MastersService } from './masters.service';
import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';
// import {UPLOAD_DIRECTIVES} from 'ng2-file-uploader/ng2-file-uploader';
const urls=["assets/myscripts/init.js"];

@Component({
  templateUrl: 'tabularpanel.component.html'
})
export class TabularPanelComponent implements OnInit 
{
  tabs:any[]=[];
  tabnames=['First','Second'];
  fields:any[]=[];//form fields
  tfields=["Id","name","code"];//table fields
  theads=["Id","Name","Code","Actions"];
  deletemodalfields:any[]=[]; //deletemodal fields
  selectedItem=null;
  loadAPI:Promise<any>;
  isForm=true;
  private zone: NgZone;
  private progress: number = 0;
  private response: any = {};
  public data:any;
  public file;
  sizeLimit = 2000000;
  ngOnInit()
  {
     this.getStates();
     this.loadScript();
  } 

  constructor(private router: Router,private mastersService: MastersService,private http:Http,@Inject(Renderer) private renderer: Renderer,public activatedRoute:ActivatedRoute) 
  {
      //form fields
      var test={name:'name',id:'name',value:'',type:'text',label:'Name',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.fields.push(test);
      test={name:'item',id:'item',type:'select',label:'Category',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',value:"option1",options:["option1","option2","option3"]};
      this.fields.push(test);
      this.tabs.push(this.fields);

      this.fields=[];
      test={name:'name1',id:'name1',value:'',type:'text',label:'Name',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.fields.push(test);
      test={name:'item1',id:'item1',type:'select',label:'Category',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',value:"h",options:["h","k","l"]};
      this.fields.push(test);
      this.tabs.push(this.fields);
      
      //deletemodal fields
      test={name:'Id',id:'Id',type:'hidden', value:'', label:'',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.deletemodalfields.push(test);
      test={name:'status',id:'status',type:'hidden',label:'', value:'deleted', isRequired:false,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.deletemodalfields.push(test);
      test={name:'operation',id:'text',type:'hidden',label:'', value:'update', isRequired:false,isReadOnly:false,isSelected:false,className:'form-control',options:null};
      this.deletemodalfields.push(test);
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
      alert("DGR");
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
       alert('hello');
     }

     files: FileList; 
     filestring: string; 

      getFiles(event) 
      { 
        alert("hii");
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
        alert(this.filestring);
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


   
  public onSelect(item:any)
  { 
     this.selectedItem=item; 
      for( var i in this.deletemodalfields)
      {
        if(this.deletemodalfields[i].name=="Id")
        {
          this.deletemodalfields[i].value=this.selectedItem.Id;
          this.deletemodalfields[0].value=this.selectedItem.Id;
        }
      }
  }

  public editSelect(sid:any)
  {
    this.router.navigate(['../edittabularpanel',{id:sid}],{relativeTo:this.activatedRoute});
  }
   getStates() 
  {
    this.mastersService.getData("states").subscribe((data)=>{setTimeout(()=>{this.data=data}, 2000)});
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
  }
  
  onUpdate(upform:NgForm) 
  {  
      alert("in update");
      alert(JSON.stringify(upform.value));
      this.mastersService.update(upform.value,"states");
  }

}
