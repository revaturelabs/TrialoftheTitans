import { api, LightningElement, wire } from 'lwc';
import getSkills from '@salesforce/apex/ProjectController.getSkills';
//import getCustomSkills from '@salesforce/apex/ProjectController.getCustomSkills'
import getResponsibilities from '@salesforce/apex/ProjectController.getResponsibilities';
import getProjectInfo from "@salesforce/apex/UserStoryController.getProjectInfo";
export default class LwcSkills extends LightningElement {
    
    responsId;
    skill;
    @api titanId;
    @api projectId;
    // get responsibility Id 
    // get name from skill  using respons Id
    
    @wire(getProjectInfo,{titanId: '$titanId'})
        getProject({error, data}) {
            if (data) {
                this.projectId = data.Id;
            }
            else if (error) {
                console.error(error);
            }
    }
    @wire(getResponsibilities, {projectId: '$projectId'})
        getResponse({error,data}){
            if(data) {
                this.responsId = data.Id;
            }
            else if(error){
                console.error(error);
            }

        }
        get reID(){
            return this.getResponse.data.Id;
        }
    @wire(getSkills, {projectId: '$projectId'})
        getSkill({error,data}){
            if(data){
                this.skill = data;
                console.log(this.skill.Id, "This Is in Data");
                console.log(this.skill.Name, "This Is in Data");
                console.log(this.skill.data, "This Is in Data");
            }
            else if(error){
                console.error(error);
                console.log(this.skill.Id, "This is in Error");
                console.log(this.skill.Name, "This is in Error");
                console.log(this.skill.error,"This is in Error");
            }
        }
        get name() {
            return this.getSkill.data.fields.Name.value;
        }
        
    
}