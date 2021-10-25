import { Component, OnInit } from '@angular/core';
import {QuizeService} from '../../../../services/quize.service';
import {Router} from '@angular/router';
import { ICategory } from 'src/app/model/category';
import { ISubcategory } from 'src/app/model/sub-category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  constructor( private quizeService:QuizeService,
              private router:Router) { }
  //id:number=0;
  category:ICategory={cat_id:0,cat_name:''}
  Categories:ICategory[]=[]
  subCategory:ISubcategory={sub_cat_id:0,sub_cat_name:'',cat_id:0};
  subCatArray:ISubcategory[]=[];
  GkCategories:ISubcategory[]=[];
  logicalThinkingArray:ISubcategory[]=[]
  BrainTeaserArray:ISubcategory[]=[]



  ngOnInit(): void {
    this.quizeService.getCategory().subscribe(response=>{
        this.Categories=<ICategory[]>response;
    })
    this.getAllsubcategory();
  
  }


  getAllsubcategory(){
    console.log('get subcategories');
      this.quizeService.getAllSubCategories().subscribe(response=>{
        if(response)
        this.subCatArray=<ISubcategory[]>response;
        console.log("sub categorues are",this.subCatArray);
        console.log("divide subcat")
        this.subCatArray.forEach(element=>{
          console.log("check cat id");
          if(element.cat_id===1){
            console.log("cat id is 1")
              this.GkCategories.push(element);
          }else if(element.cat_id===2){
            this.BrainTeaserArray.push(element);
          }else if(element.cat_id===3){
            this.logicalThinkingArray.push(element);
          }
          
        });
        console.log("gk is",this.GkCategories);
      })
     


    }


    goTosubcategory(sub_cat_id:number){
      this.quizeService.getQuizes(sub_cat_id).subscribe(response=>{
        this.router.navigate(['user/quiz-list'],{queryParams:{id:sub_cat_id}})
      
      })

    }

    goToQuize(sub_cat_id:number){
        this.router.navigate(['user/brain-teaser'],{queryParams:{id:sub_cat_id}})

     }


}
