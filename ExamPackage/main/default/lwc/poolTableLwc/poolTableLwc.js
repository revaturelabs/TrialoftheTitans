//////////////////////////////////////////////////////////////////////////////////////////////////////
//
//  Name: poolTableLwc
//  Author: Al Waisley
//  Description: JavaScript controller for poolTableLwc
//
////////////////////////////////////////////////////////////////////////////////////////////////////

import {LightningElement, api} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import GetPool from '@salesforce/apex/PoolTableApexController.GetPool';
import GetQues from '@salesforce/apex/PoolTableApexController.GetQues';

export default class titansPageLanding extends LightningElement {
    dataSize;
    enableToast;
    isLastPage;
    myData;
    pageNumber;
    pageSize;
    pools;
    searchKeyword;
    selectedPools;
    selectedRows;
    inputSelectSingleOptions = [
        {value : "10", label : "10"},
        {value : "20", label : "20"},
        {value : "50", label : "50"},
        {value : "80", label : "80"},
        {value : "100", label : "100"}
    ]
    myColumns=[
        { label: 'Question Title', fieldName: 'Name', type: 'text'},      
        { label: 'Question Text', fieldName: 'Question_Text', type: 'text'},
        { label: 'Question Type', fieldName: 'Question_Type', type: 'text'}
    ];

    connectedCallback(){
        GetPool()
            .then((result) => {
                let action2 = result;
                let rows = [];
                for (let i = 0; i < data.length; i++) {
                    let items = {	
                        Id			  : data[i].assignedQues[0].Id,
                        Name		  :	data[i].assignedQues[0].Name
                    };
                    rows.push(items);
                }
                pools = rows;
            })
            .catch((error) => {
                console.error(error);
            });
    }
    getData(){
        component.set('v.mycolumns', [
            { label: 'Question Title', fieldName: 'Name', type: 'text'},      
            { label: 'Question Text', fieldName: 'Question_Text', type: 'text'},
            { label: 'Question Type', fieldName: 'Question_Type', type: 'text'}
        ]);
        if(selectedPools.length > 0){
            var arrayselectedPools = selectedPools[0].split(';');
            var selectedObjectPools = [];
            // extract selected pool into selectedObjectPools array 
            for(let i = 0 ;i<arrayselectedPools.length;i++ ){
                for(let j=0;j<pools.length;j++){
                    if(arrayselectedPools[i]==pools[j].Name)
                    {
                        selectedObjectPools.push(pools[j]);
                    }
                }
            } 
        } else{
            selectedObjectPools = null;
        }
        //****************Get Question List*********************
        GetQues({'searchKeyword' : this.searchKeyword,
                 'pools' : this.pools,
                 'pageSize' : this.pageSize,
                 'pageNumber' : this.pageNumber})
            .then((result) => {
                this.myData = result;
                this.dataSize = myData.length;
            })
            .catch((error) => {
                console.error(error);
            });
    }
    handlePrev(){
        pageNumber -= 1;
        this.getData();
    }
    handleNext(){
        pageNumber += 1;
        this.getData();
    }
    get pageRange(){
        return ((this.pageNumber-1)*this.pageSize)+' to '+((this.pageNumber-1)*this.pageSize+this.dataSize);
    }
    get isFirstPage(){
        return this.PageNumber == 1;
    }
    get isLastPage(){
        return false;
    }
    get poolDisplayOptions(){
        let options=[];
        for (let pool of pools){
            let option = {
                value : pool.Id,
                label : pool.Name
            }
            options.push(option);
        }
        return options;
    }
}