import { Injectable }    from '@angular/core';
import { Headers, Http,Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';

export class Message
{
  status:string
  message:string
}
@Injectable()
export class MastersService 
{
  private headers = new Headers({'Content-Type': 'application/json'});
  private Url = 'http://localhost/project/public/';  // URL to web api
  // private citiesUrl = 'http://172.16.32.54/project/public/cities';  // URL to web api
  // private itemsUrl = 'http://172.16.32.54/project/public/items';  // URL to web api
  // private itemctg_Url = 'http://172.16.32.54/project/public/item_categories';  // URL to web api 
  constructor(private http: Http) { 
  }
  //---state code---//
  
  getData(ComponentName:any) 
  { 
    var Url=this.Url;
    var resp = [];
    Url=Url+"/"+ComponentName;
    return this.http.get(Url)
      .map((res:Response) => {resp = res.json().data; console.log(resp); return resp;});
  }

   getDatabyId(ComponentName:any,Id:any) 
  { 
    var Url=this.Url;
    var resp = [];
    Url=Url+"/"+ComponentName+"/"+Id;
    return this.http.get(Url)
      .map((res:Response) => {resp = res.json().data; console.log(resp); return resp;});
  }

 add(data:any,ComponentName:any):void
  {
    var Url=this.Url;
    var resp = [];
    Url=Url+"/"+ComponentName;
    alert(JSON.stringify(data));
    this.http.post(Url, JSON.stringify(data)).toPromise()
    .then(res => {
        if(res.json().data.status=="success"){
            alert(res.json().data.message)
        }
      })
      .catch(this.handleError);

  }
   addfile(name, password,filestring,filename):void
  {
    var Url='http://172.16.32.54/project/public/states';
    var resp = [];
    
    alert(JSON.stringify(name,password));
    this.http.post(Url, JSON.stringify({ Username: name, Password: password, FileData: filestring,filename:filename })).toPromise()
    .then(res => {
        if(res.json().data.status=="success"){
            alert(res.json().data.message)
        }
      })
      .catch(this.handleError);

  }

  update(data:any,ComponentName:any):void
  {
    alert(JSON.stringify(data));
    var Url=this.Url;
    var resp = [];
    Url=Url+"/"+ComponentName;
    this.http.post(Url, JSON.stringify(data)).toPromise().catch(this.handleError);
  }
  
  //---state code end---//
//---cities code---//
  getCities() 
  {
    var resp = [];
    return this.http.get('http://172.16.32.54/project/public/cities')
      .map((res:Response) => {resp = res.json().data; console.log(resp); return resp;});
  }

  //cities code end //
  
  //---items code---//
  getItems() 
  {
    var resp = [];
    return this.http.get('http://172.16.32.54/project/public/items')
      .map((res:Response) => {resp = res.json().data; console.log(resp); return resp;});
  }

  //items code end //

  //---items code---//
  getItem_Category() 
  {
    var resp = [];
    return this.http.get('http://172.16.32.54/project/public/item_categories')
      .map((res:Response) => {resp = res.json().data; console.log(resp); return resp;});
  }
  
  //items code end //
  
  private handleError(error: any): Promise<any> 
  {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}