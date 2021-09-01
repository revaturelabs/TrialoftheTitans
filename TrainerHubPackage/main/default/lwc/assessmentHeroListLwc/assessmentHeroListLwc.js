import { LightningElement,track, api, wire } from 'lwc';
import HeroList from '@salesforce/apex/HeroAssessmentListController.HeroList'
import SearchHeroList from '@salesforce/apex/HeroAssessmentListController.SearchHeroList'
import {refreshApex} from '@salesforce/apex'

export  default class AssessmentHeroListLWC extends LightningElement {
 /*  
   @track myData=[];
 
   buttonClicked;
 
   @track myNewData=[];
    @track searchValue=''; 
    @api cohortId='';
    @track result;
    refresh;
     error;
   detailButton;

    @track columns = [   
    { label: 'Hero', fieldName:'hero', type: 'text'},
    { label: 'Assessment', fieldName: 'assessment', type: 'text'},
    { label: 'Overall Score', fieldName: 'Overall_Score__c', type: 'percentage'},
    ];

  

    
    constructor(){
        super();
        this.template.addEventListener('change',this.handlesearch);
        this.template.addEventListener('viewDetails',this.viewTableDetails);
    }
    connectedCallback(){
       
        HeroList({cohortId:this.cohortId}).then(result=>{
            // the repsonse of the promise will be passed in to the then statement, we are holding that value in the result variable
            //then we can process out the myData
             
            this.myData=result.map(row=>{
                            return{...row, hero : row.Hero__r.Name,
                                    assessment: row.Assessment__r.Name
                            };
                        
                        })

                   
        //this.myData=result;
        
            //     for(let i=0;i<result.length;i++){
        //         this.myData.push({...result[i]});
        //     }
        //   //  this.myData={...result};
        //    // this.myData= JSON.parse(JSON.stringify(result)); 
        //     console.log(result);  
            
        //     for( let i=0; i< this.myData.length; i++ ){
        //         //if myData retrieved is null place value stating it is null
        //         //if not null place myData in the key for the column
        //         if(this.myData[i].Hero__c == null){
        //            this.myData[i].hero = "No Hero";
        //            //this.myData[i].hero = Object.assign([],"No Hero")
        //         } else{
        //             this.myData[i].hero = this.myData[i].Hero__r.Name;
        //             //this.myData[i].hero = Object.assign([],this.myData[i].Hero__r.Name)
        //         }
        //     }
        //     //for loop to set key for the coloumn with myData
        //     for( let i=0; i< this.myData.length; i++ ){
        //         //if myData retrieved is null place value stating it is null
        //         //if not null place myData in the key for the column
        //         if(this.myData[i].Assessment__c == null){
        //             this.myData[i].assessment = "No Assessment";
        //            //this.myData[i].assessment = Object.assign([],"No Assessment")
        //         } else{
        //             this.myData[i].assessment = this.myData[i].Assessment__r.Name ;
        //             //this.myData[i].assessment = Object.assign([],this.myData[i].Assessment__r.Name)
        //         }
        //     }
            console.log(this.myData);  
        }).catch(error => {
            this.error=error;
            console.error(this.error);
        }); 
      

    }
    getInfo(event) {
        const selectedRows = event.detail.selectedRows;
        // Display that fieldName of the selected rows
        let average=0;
        for (let i = 0; i < selectedRows.length; i++){
            average+=selectedRows[i].Overall_Score__c;
            
        }
        alert("Average Scores: " + (average/selectedRows.length));
    }
   

     @wire (HeroList,{cohortId:'$cohortId'}) fetchAssessmentHeroData({error,myData})
     {
       //new code
        
       //
        if(myData){
           
           //JSON, will display parent fields 'hero' and 'assessment'
            this.myData=myData.map(row=>{
                return{...row, hero : row.Hero__r.Name,
                        assessment: row.Assessment__r.Name
                };
            
            })    
     
        }
    }
    //Unable to debug this method to implement proper search functionality
    //the lightning-input tag was removed in assessmentHeroListLwc.html file due to this
    // @wire(SearchHeroList,{searchKey:'$searchValue', cohortId:'$cohortId'})
    // search({error,result})
    // {

    //    console.log('in search')
    //    console.log(this.searchValue);
    //         if(result){
    //            console.log(result);
    //            //JSON, will display parent fields 'hero' and 'assessment'
    //             this.myData=result.map(row=>{
    //                 return{...row, hero : row.Hero__r.Name,
    //                         assessment: row.Assessment__r.Name
    //                 };
                
    //             })
    //             console.log('in search');    
        
    //         }else {
    //             console.log('no result');
    //         }
    //     }

    
    
     viewTableDetails(event){
        
    
        
        
     }
    

    handlesearch(event){
        
        console.log('in handle search');
       this.searchValue = event.target.value;
        console.log(this.searchValue);
        
      
    // @wire(SearchHeroList,{searchKey:'$searchValue', cohortId:'$cohortId'})
    // search({error,result})
    // {

    //    console.log('in search')
    //    console.log(this.searchValue);
    //         if(result){
               
    //            //JSON, will display parent fields 'hero' and 'assessment'
    //             this.myData=result.map(row=>{
    //                 return{...row, hero : row.Hero__r.Name,
    //                         assessment: row.Assessment__r.Name
    //                 };
                
    //             })    
         
    //         }else {
    //             console.log('no result');
    //         }
    //     }

    


       SearchHeroList({searchKey:this.searchValue,cohortId:this.cohortId}).then(result =>{

            
            
           
            this.myData=result.map(newRow=>{
                return{...newRow, hero : newRow.Hero__r.Name,
                        assessment: newRow.Assessment__r.Name
                        
                };
               
            })
             
            
           
        
            console.log('new search data');
            console.log(this.myData);
           
         
            
            
            
    //     //     the repsonse of the promise will be passed in to the then statement, we are holding that value in the result variable
    //     //     then we can process out the myData
    //     //     for(let i=0;i<result.length;i++){
    //     //         this.myData.push({...result[i]});
    //     //     }
       
    //     // for( let i=0; i< this.myData.length; i++ ){
    //     //     //if myData retrieved is null place value stating it is null
    //     //     //if not null place myData in the key for the column
    //     //     if(this.myData[i].Hero__c == null){
    //     //         this.myData[i].hero = "No Hero";
    //     //       // this.myData[i].hero = Object.assign([],"No Hero")
    //     //     } else{
    //     //        this.myData[i].hero = this.myData[i].Hero__r.Name;
    //     //        //this.myData[i].hero = Object.assign([],this.myData[i].Hero__r.Name)
    //     //     }
    //     // }
    //     // //for loop to set key for the coloumn with myData
    //     // for( let i=0; i< this.myData.length; i++ ){
    //     //     //if myData retrieved is null place value stating it is null
    //     //     //if not null place myData in the key for the column
    //     //     if(this.myData[i].Assessment__c == null){
    //     //        this.myData[i].assessment = "No Assessment";
    //     //        //this.myData[i].assessment = Object.assign([],"No Assessment")
    //     //     } else{
    //     //        this.myData[i].assessment = this.myData[i].Assessment__r.Name ;
    //     //        //this.myData[i].assessment = Object.assign([],this.myData[i].Assessment__r.Name)
    //     //     }
    //     // }
    //     console.log('leaving handle search');
    
    }).catch(error => {
        this.error=error;
        console.error(this.error);
    });

    
    


    
    }
 */

}
