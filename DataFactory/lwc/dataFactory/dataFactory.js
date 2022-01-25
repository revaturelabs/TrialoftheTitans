import { LightningElement,wire,track } from 'lwc';
import GenerateData from '@salesforce/apex/ApexDataFactory.GenerateData';
import deleteStuff from '@salesforce/apex/ApexDataFactory.deleteStuff';

export default class DataFactory extends LightningElement {
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