import { LightningElement,wire,track } from 'lwc';
import GenerateData from '@salesforce/apex/ApexDataFactory.GenerateData';
import deleteStuff from '@salesforce/apex/ApexDataFactory.deleteStuff';

export default class DataFactory extends LightningElement {
    //ShowDataButton determines whether the delete data button or the generate data button is displayed, 
    //the user will always be prompted to delete before generation of data is allowed
    ShowDataButton = false;
    handleDeleteClick(){
        deleteStuff();
        this.ShowDataButton = true;
    }
    handleDataClick(){        
        GenerateData();
        this.ShowDataButton = false;
    }

    
}
