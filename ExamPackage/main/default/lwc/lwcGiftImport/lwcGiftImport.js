import { api, LightningElement, track } from 'lwc';
import ImportFile from '@salesforce/apex/AuraGIFTImportController.ImportFile';
import HandleInit from '@salesforce/apex/AuraGIFTImportController.HandleInit';

export default class LwcGiftImport extends LightningElement {
    initMessage='Ready to Import Questions'
    @track
    titans = [];
    @track
    technologies = [];
    valueTitan = '';
    valueTech = 'sf';
    fileName = 'No file selected...';
    toImport = 0;
    submitScreen=false;

    connectedCallback() {
        HandleInit().then((result) => {
            //console.log(result);
            let valuesMap = result;
            //console.log(valuesMap);
            this.technologies = valuesMap["Technologies"];
            console.log(this.technologies);
            this.valueTech = valuesMap["Technologies"][0]["TitanId"];
            console.log(this.valueTech);
            this.titans = valuesMap["Titans"];
            //console.log(this.titans);
            this.valueTitan = valuesMap["Titans"][0]["Id"];
            //console.log(this.valueTitan)
            this.initMessage = "Ready to import questions.";
        })
    }
    get titanOptions() {
        let titanList = [];
        for(let i=0; i<this.titans.length; i++) {
            let t = {
                value: this.titans[i].Id,
                label: this.titans[i].Name,
            };
            titanList.push(t);   
        }
        return titanList;
    }
    
    get techOptions() {
        let techList = [];
        for(let i=0; i<this.technologies.length; i++) {
            let t = {
                value: this.technologies[i].TitanId,
                label: this.technologies[i].TechnologyName
            };
            techList.push(t);
        }

        
        return techList;
    }

    /*get techOptions() {
        return [
            {label: 'Salesforce', value: 'sf'}
        ];
    }*/

    handleChange(event) {
        this.valueTitan = event.detail.value;
        for(let i in this.technologies){
            console.log(this.technologies[i]["TitanId"])
            console.log(i);
            if(this.technologies[i]["TitanId"] == this.valueTitan){
                this.valueTech = this.technologies[i]["TitanId"];
            }

        }
        
        console.log(this.valueTitan);
        console.log(this.valueTech);
    }
    handleNext(event) {
        this.submitScreen = true;
    }
}