import { LightningElement, api } from 'lwc';

export default class AnimatedHeader extends LightningElement {

    @api leadTeams;
    
    @api isAlchemy(){
        return this.leadTeams.Team[0][0] == 'Alchemy';
    }

    @api isAmplifire(){
        return this.leadTeams.Team[0][0] == 'Amplifire';
    }

    @api isSynergy(){
        return this.leadTeams.Team[0][0] == 'Synergy';
    }

    @api isVanquish(){
        return this.leadTeams.Team[0][0] == 'Vanquish';
    }

}