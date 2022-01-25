import { LightningElement, wire, api} from 'lwc';

import fetchUser from '@salesforce/apex/TitanPageApexController.fetchUser';

import VALKYRIE_GIF from '@salesforce/resourceUrl/TitanResources';
import CHIMERA_GIF from '@salesforce/resourceUrl/TitanResources';

import getTitansList from '@salesforce/apex/TitanPageApexController.getTitansList';



export default class LwcTitanPageLanding extends LightningElement {
    
    // Get the current user's full name. 
    // Use {userName.data} in HTML.
    @wire(fetchUser) 
    userName;

    // Get the link of the gif in staticresources folder. 
    // Use {valkyieUrl} and {chimeraUrl} in HTML.
    valkyrieUrl = VALKYRIE_GIF + '/TitanResources/Valkyrie.gif';
    chimeraUrl = CHIMERA_GIF + '/TitanResources/Chimera.gif';

    @wire(getTitansList) 
    titans;

}
