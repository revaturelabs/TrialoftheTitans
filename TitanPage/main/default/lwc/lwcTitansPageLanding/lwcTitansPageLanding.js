import { LightningElement, wire, api} from 'lwc';

import fetchUser from '@salesforce/apex/TitanPageApexController.fetchUser';

import VALKYRIE_GIF from '@salesforce/resourceUrl/TitanResources';
import CHIMERA_GIF from '@salesforce/resourceUrl/TitanResources';

import getTitansList from '@salesforce/apex/TitanPageApexController.getTitansList';

import TITAN_OBJECT from '@salesforce/schema/Titan__c';
import TITAN_NAME_FIELD from '@salesforce/schema/Titan__c.Name';



export default class LwcTitanPageLanding extends LightningElement {
    
    // Get the current user's full name. 
    // Use {userName.data} in HTML.
    @wire(fetchUser) 
    userName;

    // Get the link of the gif in staticresources folder. 
    // Use {valkyieUrl} and {chimeraUrl} in HTML.
    valkyrieUrl = VALKYRIE_GIF + '/TitanResources/Valkyrie.gif';
    chimeraUrl = CHIMERA_GIF + '/TitanResources/Chimera.gif';

    //@api titanListIsEmpty = false;
    //titanListIsEmpty = true;
    //@api titanList;
    //@api error;
    @wire(getTitansList) 
    titans;




    /*
    setTitanListData({ error, data }) {
        if (data) {
            this.titanList = data;
            //console.log(this.titanList[0].Name);
            this.error = undefined;
            if (this.titanList.size() >= 1) {
                this.titanListIsEmpty = false;
            } else {
                this.titanListIsEmpty = true;
            }
        } else if(error) {
            this.titanList = undefined;
            this.error = error;
        }
    }
*/

    




}
