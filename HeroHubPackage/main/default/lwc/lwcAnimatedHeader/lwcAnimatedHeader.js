import { LightningElement, api } from 'lwc';

export default class AnimatedHeader extends LightningElement {

    @api leadTeams;

    isAlchemy = false;
    isAmplifire = false;
    isSynergy = false;
    isVanquish = false;

    /*
    currentTeam(){
        if(leadTeams.Team[0][0] == 'Alchemy'){
            isAlchemy = true;
            isAmplifire = false;
            isSynergy = false;
            isVanquish = false;
        }
        else if(leadTeams.Team[0][0] == 'Amplifire'){
            isAlchemy = false;
            isAmplifire = true;
            isSynergy = false;
            isVanquish = false;
        }
        else if(leadTeams.Team[0][0] == 'Synergy'){
            isAlchemy = false;
            isAmplifire = false;
            isSynergy = true;
            isVanquish = false;
        }
        else if(leadTeams.Team[0][0] = 'Vanquish'){
            isAlchemy = false;
            isAmplifire = false;
            isSynergy = false;
            isVanquish = true;
        }
    }
    */

}