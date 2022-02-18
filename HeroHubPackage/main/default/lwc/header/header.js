import getTeamInfo from '@salesforce/apex/headerHelper.getTeamInfo';
import getTechInfo from '@salesforce/apex/headerHelper.getTechInfo';
import { LightningElement,wire } from 'lwc';

export default class Header extends LightningElement {
    @wire(getTeamInfo) teamInfo;
    @wire(getTechInfo) techInfo;
    tottPic= 'https://cdn.discordapp.com/attachments/851457681172201513/851465391448260638/trialofthetitans2.png'
    teamName;
    team1Color;
    team2Color;
    teamSlogan;
    colorForBack="background-color: gray;";
    colorForBack2;
    colorForTri;
    colorForTri2;
    techName= 'Place Holder'
    ampPic= 'https://cdn.discordapp.com/attachments/844981566467080252/933841239822958652/Amplifire_logo.png'
    alchPic= 'https://cdn.discordapp.com/attachments/844981566467080252/933841239323856906/Alchemy.png';
    synPic= 'https://cdn.discordapp.com/attachments/844981566467080252/933841241173528586/Synergy.png';
    vanPic= 'https://cdn.discordapp.com/attachments/844981566467080252/933841241710424124/Vanquish.png';
    leadPic;



    renderedCallback(){
        if(this.teamInfo.data && this.techInfo){
            console.log('test')
            this.teamName=this.teamInfo.data[0].Name
            this.team1Color=this.teamInfo.data[0].Primary_Color__c
            this.team2Color=this.teamInfo.data[0].Secondary_Color__c
            this.colorForBack="background-color: "+this.team1Color +";"
            this.colorForBack2="background-color: "+this.team2Color +";"
            this.colorForTri="border-top: 15vw solid white;"
            this.colorForTri2="border-top: 20vmin solid "+this.team2Color +";"
            this.teamSlogan=this.teamInfo.data[0].Slogan__c
            if(this.techInfo.data){
            this.techName= this.techInfo.data.Technology__c}
            if(this.teamName=="Amplifire"){
                this.leadPic=this.ampPic
            }
            if(this.teamName=="Alchemy"){
                this.leadPic=this.alchPic
            }
            if(this.teamName=="Synergy"){
                this.leadPic=this.synPic
            }
            if(this.teamName=="Vanquish"){
                this.leadPic=this.vanPic
            }
        }
    }
 
}