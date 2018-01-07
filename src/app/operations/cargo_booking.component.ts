import { Component , OnInit,ViewChild,Inject,ElementRef} from '@angular/core';
import { Http } from '@angular/http';
import { Router }            from '@angular/router';
import { NgForm } from '@angular/forms';
import { CargoOperationsService } from './cargo_operations.service';
import{Renderer} from  '@angular/core';
const urls=["assets/myscripts/init.js"];

@Component({
 templateUrl: 'cargo_booking.component.html'
})
export class CargoBookingComponent implements OnInit 
{
  isForm=true;
  ngOnInit()
  {
    this.isForm=true;
    this.loadScript();
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

  constructor(private router: Router,private cargoService: CargoOperationsService, private http:Http, @Inject(Renderer) private renderer: Renderer)
  {
    
    var data={itemDescription:'',quantity:'',kgs:'',cdm:'',freightCharge:''};
    this. item_data.push(data);    
  }
    onSubmit(form:NgForm) 
  { 
      alert(JSON.stringify(form.value));
      this.cargoService.add(form.value,"cargo_booking");
  }
  
  isShow=false;
  showDetails="More Details";
  item_data:any[]=[];
  isCard=false;
  noOfItems=0;
  isRemove=true;
  total=0;

  onshow(){
      if(this.isShow){
        this.showDetails="Hide Details";
      }
      else{
        this.showDetails="More Details";
      }

  }
  priceChange(form2:NgForm){
 //   alert("hii");
    var val=this.noOfItems;
 // alert(val)
      this.total=0; 
      if( val == 0){
        this.total= form2.value['freightCharge'+0];

      }
      else{
          for(var i=0;i<=val;i++){
           // alert(form2.value['freightCharge'+i])
            this.total= this.total+form2.value['freightCharge'+i];
      }

      }
    // alert(this.total) 
  }
   
   addItem(form:NgForm){
      // alert(JSON.stringify(form.value));   
  //    alert(this.noOfItems);
        
      this. item_data[this.noOfItems].itemDescription=form.value['itemDescription'+this.noOfItems]
      this. item_data[this.noOfItems].quantity=form.value['quantity'+this.noOfItems]
      this. item_data[this.noOfItems].kgs=form.value['kgs'+this.noOfItems]
      this. item_data[this.noOfItems].cdm=form.value['cdm'+this.noOfItems]
      this. item_data[this.noOfItems].freightCharge=form.value['freightCharge'+this.noOfItems]
       // val=form.value['freightCharge'+i];
      var data={itemDescription:'',quantity:'',kgs:'',cdm:'',freightCharge:''};
      this. item_data.push(data);;
      this.noOfItems=this.noOfItems+1;
      alert(JSON.stringify(this.item_data));   
   }
   removeItem(form1:NgForm){
    //   alert(JSON.stringify(form1.value));
      this.total=this.total-form1.value['freightCharge'+this.noOfItems]; 
      this.noOfItems=-1;
       var data=this. item_data.pop();
      
   }


}
