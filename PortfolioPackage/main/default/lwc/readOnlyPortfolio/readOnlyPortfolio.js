import { LightningElement, api, wire , track} from 'lwc';
import uid from '@salesforce/user/Id';
export default class ReadOnlyPortfolio extends LightningElement {
@track userID =uid;
}

