
/*
Created by: Andrew Emond
Updated by: Phillip Nguyen-Phan
Description: Header Component for the hero hub, titan page, and anywhere else that needs it.
Date Created: 1/21/2022
Date Updated: 2/22/2022
*/

import getTeamInfo from '@salesforce/apex/headerHelper.getTeamInfo';
import getTechInfo from '@salesforce/apex/headerHelper.getTechInfo';
import { LightningElement,wire } from 'lwc';
//import tottImage from '@salesforce/resourceUrl/tottImage'; 
//import synergyImage from '@salesforce/resourceUrl/synergyImage'; 

export default class Header extends LightningElement {

    // The wire service provides results to teamInfo and techInfo via an object with either an error or data property.
    // https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.apex_wire_method

    @wire(getTeamInfo) teamInfo;   //Instantiating some variables. wiring in the helper methods, and hard coding in team pictures and main picture

    @wire(getTechInfo) techInfo;

    tottPic= 'https://cdn.discordapp.com/attachments/851457681172201513/851465391448260638/trialofthetitans2.png';

    //tottPic = tottImage; 
    teamName;
    team1Color;
    team2Color;
    teamSlogan;
    colorForBack="background-color: #fcfce1;";
    colorForBack2;
    colorForTri;
    colorForTri2;
    techName= 'Salesforce'
    ampPic= 'https://cdn.discordapp.com/attachments/844981566467080252/933841239822958652/Amplifire_logo.png'
    alchPic= 'https://cdn.discordapp.com/attachments/844981566467080252/933841239323856906/Alchemy.png';
    synPic= 'https://cdn.discordapp.com/attachments/844981566467080252/933841241173528586/Synergy.png';
    //synPic= synergyImage; 
    vanPic= 'https://cdn.discordapp.com/attachments/844981566467080252/933841241710424124/Vanquish.png';
    leadPic;

    renderedCallback(){ 
        //console.log(this.techInfo.data);
        //console.log(this.teamInfo.data);   
        
        //rendered callback to display data when page is loaded. Mostly for data binding to display on the html based on whats returned from the classes.
        if(this.teamInfo.data && this.techInfo.data){           //if statements to prevent javascript errors from using rendered callback.
            this.teamName=this.teamInfo.data[0].Name;                  
            this.team1Color=this.teamInfo.data[0].Primary_Color__c;
            this.team2Color=this.teamInfo.data[0].Secondary_Color__c;
            this.colorForTri="background: linear-gradient(to top right," + "#fcfce1 0%, #fcfce1 50%, " + this.team1Color + " 50%, " + this.team1Color + " 100%);";
            
            // commented the following 4 styling statements to have more control over the triangle
            //this.colorForBack="background-color: "+this.team1Color +";";           //the colorForBack that matters
            //this.colorForBack2="background-color: "+this.team2Color +";";          //This one is not used, but if a future iteration wants to use the secondary color, its here
            //this.colorForTri="border-top: 15vw solid white;";                      //I decided to make the triangle white, use the below code if you want to make it the secondary color.
            //this.colorForTri2="border-top: 20vmin solid "+this.team2Color +";";    //Again not used, but you can use that second color if you want. Here for the triangle.
            this.teamSlogan=this.teamInfo.data[0].Slogan__c;
            if(this.techInfo.data){
            this.techName= this.techInfo.data.Technology__c;}
            if(this.teamName=="Amplifire"){               //If statements for for placing the leading teams picture on the upper right.
                this.leadPic=this.ampPic;
            }
            if(this.teamName=="Alchemy"){
                this.leadPic=this.alchPic;
            }
            if(this.teamName=="Synergy"){
                this.leadPic=this.synPic;
            }
            if(this.teamName=="Vanquish"){
                this.leadPic=this.vanPic;
            }
        }
    }
 
}
