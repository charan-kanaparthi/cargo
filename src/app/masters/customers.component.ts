import { Component ,Directive,Input,OnChanges,SimpleChanges, OnInit,Renderer,ViewChild,Inject,NgZone,SecurityContext,ElementRef} from '@angular/core';
import { Headers, Http, RequestOptions  } from '@angular/http';
import { NgForm } from '@angular/forms';
import { Router , ActivatedRoute }  from '@angular/router';
import{MastersService} from './masters.service';
import {Pipe, PipeTransform} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
@Pipe({name: 'safeHtml'})
export class SafeHtml implements PipeTransform {
  constructor(private sanitizer:DomSanitizer, private elementRef:ElementRef){}
  transform(html) {
    
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}


@Directive({selector: '[safeHtml]'})
export class HtmlDirective implements OnChanges {
  @Input() safeHtml:string;
  constructor(private sanitizer:DomSanitizer, private elementRef:ElementRef){}
  ngOnChanges(changes:SimpleChanges):any{
    if('safeHtml' in changes){
      this.elementRef.nativeElement.innerHTML=this.sanitizer.bypassSecurityTrustHtml(this.safeHtml);
    }

    
  }


}

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
  chckboxvalues:boolean[]=[];
  constructor(name:string,id:string,type:string,label:string,isRequired:boolean,isReadOnly:boolean,isSelected:boolean,className:string,value:string,chckboxvalues:boolean [])
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
    this.chckboxvalues=chckboxvalues

  }
}

const urls=[
        "assets/myscripts/init.js"
    ];

@Component({
  templateUrl: 'customers.component.html',
 
})
export class CustomersComponent implements OnInit 
{
  fields:Field[]=[];
  theads:String[]=[];
  modalfields:Field[]=[];
  receivermodalfields:Field[]=[];
  deletemodalfields:Field[]=[];
  receiverEditModalFields:Field[]=[];
  selectedState=null;
  componentName="Customers";
  selectedTabledata=null;
  loadAPI:Promise<any>;
  cmp=0;
  isForm=true;
  checkboxFlag=[true,false,false];
  table_data:any[]=[];
  tfields=["Id","idType","idNo","name","emailId","mobileNumber","landline","city","block","commune","address","tinNumber"];
  tformFields=["Id","idType","idNo","name","emailId","mobileNumber","landline","city","block","commune","address","tinNumber","n","receiverNo"];
  private zone: NgZone;
  public receiverNos:number=1;
  private progress: number = 0;
  private response: any = {};

  ngOnInit()
  {
     this.getCustomers();
     this.loadScript();
   
  } 
  
  uploadFile: any;
  hasBaseDropZoneOver: boolean = false;
  options: Object = {
    url: 'http://http://172.16.32.54/project/public/uploads'
  };
  sizeLimit = 2000000;
 
  handleUpload(data): void {
    if (data && data.response) {
      data = JSON.parse(data.response);
      this.uploadFile = data;
    }
  }
 
  fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
  beforeUpload(uploadingFile): void {
    if (uploadingFile.size > this.sizeLimit) {
      uploadingFile.setAbort();
      alert('File is too large');
    }
  }
   public data;
   public file;
  constructor(private router: Router,private mastersService: MastersService,private http:Http,@Inject(Renderer) private renderer: Renderer, public activatedRoute: ActivatedRoute) 
  {
    //Fields
      var test={name:'idType',id:'select',type:'select',label:'ID Type',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',value:"option1",options:["option1","option2","option3"],chckboxvalues:null};
      this.fields.push(test);
      test={name:'idNo',id:'code',type:'text', value:'', label:'ID No',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null,chckboxvalues:null};
      this.fields.push(test);
      test={name:'name',id:'name',  value:'',type:'text',label:'Senders Name',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null ,chckboxvalues:null};
      this.fields.push(test);
      test={name:'emailId',id:'emailId',  value:'',type:'text',label:'Email ID',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null ,chckboxvalues:null};
      this.fields.push(test);
      test={name:'mobileNumber',id:'mobileNumber',type:'number', value:'', label:'Mobile Number',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null,chckboxvalues:null};
      this.fields.push(test);
      test={name:'landline',id:'landline',type:'number', value:'', label:'Landline',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null,chckboxvalues:null};
      this.fields.push(test);
      test={name:'city',id:'name',  value:'',type:'text',label:'City',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null ,chckboxvalues:null};
      this.fields.push(test);
      test={name:'n',id:'n',  value:'',type:'text',label:'N',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null ,chckboxvalues:null};
      this.fields.push(test);  
      test={name:'block',id:'block',  value:'',type:'text',label:'Block',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null ,chckboxvalues:null};
      this.fields.push(test);
      test={name:'commune',id:'commune',  value:'',type:'text',label:'Commune',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null ,chckboxvalues:null};
      this.fields.push(test);
      test={name:'address',id:'address',  value:'',type:'text',label:'Address',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null ,chckboxvalues:null};
      this.fields.push(test);
      test={name:'tinNumber',id:'tinNumber',  value:'',type:'text',label:'TIN Number',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null ,chckboxvalues:null};
      this.fields.push(test);
      test={name:'receiverNo',id:'',  value:'0',type:'hidden',label:'',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null ,chckboxvalues:null};
      this.fields.push(test);
      // test={name:'radio',id:'radio',type:'radio',label:'radio',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',value:"option1",options:["option1","option2","option3"],chckboxvalues:null};
      // this.fields.push(test);
      // test={name:'checkbox',id:'name',type:'checkbox',label:'checkbox',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',value:"option1",options:["option1","option2","option3"], chckboxvalues:[true,false,false]};
      // this.fields.push(test);
      
//receiverEditModalFields
      var test={name:'idType',id:'select',type:'select',label:'ID Type',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',value:"option1",options:["option1","option2","option3"],chckboxvalues:null};
      this.receiverEditModalFields.push(test);
      test={name:'idNo',id:'code',type:'text', value:'', label:'ID No',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null,chckboxvalues:null};
      this.receiverEditModalFields.push(test);
      test={name:'name',id:'name',  value:'',type:'text',label:'Receiver Name',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null ,chckboxvalues:null};
      this.receiverEditModalFields.push(test);
      test={name:'emailId',id:'emailId',  value:'',type:'text',label:'Email ID',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null ,chckboxvalues:null};
      this.receiverEditModalFields.push(test);
      test={name:'mobileNumber',id:'mobileNumber',type:'number', value:'', label:'Mobile Number',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null,chckboxvalues:null};
      this.receiverEditModalFields.push(test);
      test={name:'landline',id:'landline',type:'number', value:'', label:'Landline',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null,chckboxvalues:null};
      this.receiverEditModalFields.push(test);
      test={name:'city',id:'name',  value:'',type:'text',label:'City',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null ,chckboxvalues:null};
      this.receiverEditModalFields.push(test);
      test={name:'n',id:'n',  value:'',type:'text',label:'N',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null ,chckboxvalues:null};
      this.receiverEditModalFields.push(test);  
      test={name:'block',id:'block',  value:'',type:'text',label:'Block',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null ,chckboxvalues:null};
      this.receiverEditModalFields.push(test);
      test={name:'commune',id:'commune',  value:'',type:'text',label:'Commune',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null ,chckboxvalues:null};
      this.receiverEditModalFields.push(test);
      test={name:'address',id:'address',  value:'',type:'text',label:'Address',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null ,chckboxvalues:null};
      this.receiverEditModalFields.push(test);
      test={name:'tinNumber',id:'tinNumber',  value:'',type:'text',label:'TIN Number',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null ,chckboxvalues:null};
      this.receiverEditModalFields.push(test);
      test={name:'receiverNo',id:'',  value:'',type:'hidden',label:'',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null ,chckboxvalues:null};
      this.receiverEditModalFields.push(test);
//receiverModalFields
      var test={name:'idType',id:'select',type:'select',label:'ID Type',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',value:"option1",options:["option1","option2","option3"],chckboxvalues:null};
      this.receivermodalfields.push(test);
      test={name:'idNo',id:'code',type:'text', value:'', label:'ID No',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null,chckboxvalues:null};
      this.receivermodalfields.push(test);
      test={name:'name',id:'name',  value:'',type:'text',label:'Receiver Name',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null ,chckboxvalues:null};
      this.receivermodalfields.push(test);
      test={name:'emailId',id:'emailId',  value:'',type:'text',label:'Email ID',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null ,chckboxvalues:null};
      this.receivermodalfields.push(test);
      test={name:'mobileNumber',id:'mobileNumber',type:'number', value:'', label:'Mobile Number',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null,chckboxvalues:null};
      this.receivermodalfields.push(test);
      test={name:'landline',id:'landline',type:'number', value:'', label:'Landline',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null,chckboxvalues:null};
      this.receivermodalfields.push(test);
      test={name:'city',id:'name',  value:'',type:'text',label:'City',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null ,chckboxvalues:null};
      this.receivermodalfields.push(test);
      test={name:'n',id:'n',  value:'',type:'text',label:'N',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null ,chckboxvalues:null};
      this.receivermodalfields.push(test);  
      test={name:'block',id:'block',  value:'',type:'text',label:'Block',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null ,chckboxvalues:null};
      this.receivermodalfields.push(test);
      test={name:'commune',id:'commune',  value:'',type:'text',label:'Commune',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null ,chckboxvalues:null};
      this.receivermodalfields.push(test);
      test={name:'address',id:'address',  value:'',type:'text',label:'Address',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null ,chckboxvalues:null};
      this.receivermodalfields.push(test);
      test={name:'tinNumber',id:'tinNumber',  value:'',type:'text',label:'TIN Number',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null ,chckboxvalues:null};
      this.receivermodalfields.push(test);
      test={name:'receiverNo',id:'',  value:'',type:'hidden',label:'',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null ,chckboxvalues:null};
      this.receivermodalfields.push(test);
     
      var test={name:'idType',id:'select',type:'select',label:'ID Type',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',value:"option1",options:["option1","option2","option3"],chckboxvalues:null};
      this.modalfields.push(test);
      test={name:'idNo',id:'code',type:'text', value:'', label:'ID No',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null,chckboxvalues:null};
      this.modalfields.push(test);
      test={name:'name',id:'name',  value:'',type:'text',label:'Receiver Name',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null ,chckboxvalues:null};
      this.modalfields.push(test);
      test={name:'emailId',id:'emailId',  value:'',type:'text',label:'Email ID',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null ,chckboxvalues:null};
      this.modalfields.push(test);
      test={name:'mobileNumber',id:'mobileNumber',type:'number', value:'', label:'Mobile Number',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null,chckboxvalues:null};
      this.modalfields.push(test);
      test={name:'landline',id:'landline',type:'number', value:'', label:'Landline',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null,chckboxvalues:null};
      this.modalfields.push(test);
      test={name:'city',id:'name',  value:'',type:'text',label:'City',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null ,chckboxvalues:null};
      this.modalfields.push(test);
      test={name:'n',id:'n',  value:'',type:'text',label:'N',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null ,chckboxvalues:null};
      this.modalfields.push(test);  
      test={name:'block',id:'block',  value:'',type:'text',label:'Block',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null ,chckboxvalues:null};
      this.modalfields.push(test);
      test={name:'commune',id:'commune',  value:'',type:'text',label:'Commune',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null ,chckboxvalues:null};
      this.modalfields.push(test);
      test={name:'address',id:'address',  value:'',type:'text',label:'Address',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null ,chckboxvalues:null};
      this.modalfields.push(test);
      test={name:'tinNumber',id:'tinNumber',  value:'',type:'text',label:'TIN Number',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null ,chckboxvalues:null};
      this.modalfields.push(test);
      test={name:'receiverNo',id:'',  value:'',type:'hidden',label:'',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null ,chckboxvalues:null};
      this.modalfields.push(test);
      test={name:'Id',id:'',  value:'',type:'hidden',label:'',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null ,chckboxvalues:null};
      this.modalfields.push(test);

      test={name:'Id',id:'Id',type:'hidden', value:'', label:'',isRequired:true,isReadOnly:false,isSelected:false,className:'form-control',options:null,chckboxvalues:null};
      this.deletemodalfields.push(test);
      test={name:'status',id:'status',type:'hidden',label:'', value:'delete', isRequired:false,isReadOnly:false,isSelected:false,className:'form-control',options:null,chckboxvalues:null};
      this.deletemodalfields.push(test);
      test={name:'operation',id:'text',type:'hidden',label:'', value:'update', isRequired:false,isReadOnly:false,isSelected:false,className:'form-control',options:null,chckboxvalues:null};
      this.deletemodalfields.push(test);
      
      
      this.theads.push("Id","Id Type","Id No","Name","Email Id","Mobile Number","Landline","City","Block","Commune","Address","TIN Number","Action");
       //var table_row={};
      // this.table_data.push(table_row);   
  }
     files: FileList; 
     filestring: string; 

     
      deleteRow(receiverno:any){
        var j=0;
        for( var i in this.table_data){
            if(this.table_data[i].receiverNo==receiverno){
              this.table_data.splice(j,1);
            }
             j++;
            }
           
      }

      editRow(form:NgForm){
        
        alert(JSON.stringify(form.value));
          var j=0 
          for( var i in this.table_data){
            if(this.table_data[i].receiverNo==form.value.receiverNo){
            //  alert(this.table_data[i].name)
              //   alert(form.value.name)
               //  alert(j)
                  this.table_data.splice(j,1,form.value);      
                  break;
               }
               j++;
            }          
      }
      getFiles(event) { 
        this.files = event.target.files; 
        var reader = new FileReader(); 
         let file : File = this.files.item(0);
         this.file = file.name;
        reader.onload = this._handleReaderLoaded.bind(this); 
        reader.readAsBinaryString(this.files[0]); 
    } 
 
    _handleReaderLoaded(readerEvt) { 
        var binaryString = readerEvt.target.result; 
        this.filestring = btoa(binaryString); 
        alert(this.filestring);
        console.log(this.filestring); // Converting binary string data. 
   }  

 public onSelect(item:any)
  { 
          var checkvalue="";   
          this.selectedTabledata=item; 
          for (let ref of this.modalfields) {
              for(let tff of this.tformFields){ 
                  if(ref['name']==tff && ref['name']!='checkbox' )
                  {
                    //  alert(ref['name'])
                    ref.value=this.selectedTabledata[tff];
                     if(ref.name=="Id"){               
                        this.deletemodalfields[0].value=this.selectedTabledata[tff];
                       }
                   }    
                       
                  if(ref['name']=='checkbox' ){
                       var k=0
                        for(let opt of ref['options']){
                            if(item['checkbox'+k]){
                              checkvalue+=opt
                              this.checkboxFlag[k]=item['checkbox'+k];
                            }
                          k++;
                        }
                  }
             }
          } 
  }

  public onSelectReciever(item:any,receiverNo:any)
    {    
          var checkvalue="";   
          this.selectedTabledata=item; 
          for (let ref of this.receiverEditModalFields) {
              for(let tff of this.tformFields){ 

                if(ref['name']==tff && ref['name']!='checkbox' ){
                  //  alert(ref['name'])
                  ref.value=this.selectedTabledata[tff];
                }
                if(ref['name']=='receiverNo'  ){
                //  alert(ref['name'])
                  ref.value=receiverNo;
                }
                

                if(ref['name']=='checkbox' ){
                    var k=0
                    for(let opt of ref['options']){
                      if(item['checkbox'+k]){
                        checkvalue+=opt
                        this.checkboxFlag[k]=item['checkbox'+k];
                      }
                      k++;
                    }
                }
             }
          } 
     } 
  
modalTodefault(){
 for (let ref of this.receivermodalfields) {
        for(let tff of this.tformFields){ 
                if(ref['name']==tff){
                  //alert(tff);
                  ref.value="";
                   console.log(ref.value);
                   //alert(ref.value);
                }

              }
             
}


}
  public newData=[];
  getCustomers() 
  {
    this.mastersService.getData("customers").subscribe((data)=>{setTimeout(()=>{this.data=data;
    for(var i in data)
    {
    if(data[i].senderId==0)
    {
    this.newData.push(this.data[i]);
    }
}
  }, 2000)});
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

   public selected(value:any):void {
    console.log('Selected value is: ', value);
  }

  public removed(value:any):void {
    console.log('Removed value is: ', value);
  }

  public refreshValue(value:any):void {
    this.value = value;
  }

public  reciverdata(recform:NgForm){
   alert(JSON.stringify(recform.value));
   recform.value['receiverNo']=this.receiverNos;
   this.table_data.push(recform.value); 
   this.receiverNos++;
     alert(JSON.stringify(this.table_data));
}

  public itemsToString(value:Array<any> = []):string {
    return value
      .map((item:any) => {
        return item.text;
      }).join(',');
  }
  showModal(){
    alert("in show modal");
    //editModal.show()
  }

  onSubmit(form:NgForm) 
  { 
      alert(JSON.stringify(form.value));
       // console.log(this.files); 
      //  this.sendValues("15","15");
        //this.mastersService.addfile("15","15",this.filestring,this.file );
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
       this.table_data.splice(0, 0, form.value);
       this.mastersService.add(this.table_data,"customers");
  }
  

  onUpdate(upform:NgForm) 
  {  
      //this.selectedState=state;
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
     this.mastersService.update(upform.value,"customers");
  }

  viewRecieverDetails(sid:any){
    //this.router.navigate(['/receivers', {id:sid} ]);

    this.router.navigate(['../receivers',{id:sid}], {relativeTo: this.activatedRoute});
  }
}
