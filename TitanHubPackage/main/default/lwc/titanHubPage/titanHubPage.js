import { LightningElement, api, wire} from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
export default class TitanHubPage extends LightningElement {
    // @api titanId = "a0X8c00000Q3t7YEAR";
    // @api accountId = '0018c000028TxZoAAK';

    //@api titanId = "a0X8c00000NmpKDEAZ";
    //@api accountId = "0018c000029wwOKAAY";

    @api titanId;
    @api accountId;

    currentPageReference = null; 
    urlStateParameters = null;

    @wire(CurrentPageReference)
    getStateParameters(currentPageReference) {
       if (currentPageReference) {
          this.urlStateParameters = currentPageReference.state;
          this.setParametersBasedOnUrl();
       }
    }

    setParametersBasedOnUrl() {
        this.titanId = this.urlStateParameters.c__titanId || null;
        this.accountId = this.urlStateParameters.c__accountId || null;
     }

}