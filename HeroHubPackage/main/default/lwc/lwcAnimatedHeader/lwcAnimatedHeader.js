import { LightningElement, api } from 'lwc';

export default class AnimatedHeader extends LightningElement {

    @api leadTeams;

    isAlchemy = false;
    isAmplifire = false;
    isSynergy = false;
    isVanquish = false;

}