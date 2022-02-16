import { LightningElement, wire, track, api } from 'lwc';
import Id from '@salesforce/user/Id';
import NAME from '@salesforce/schema/User.Name';


export default class LwcAnimatedHeader extends LightningElement {

    @api leadTeams;
    @api ItemsList;
    
    init(component){
        let HeaderText = "const hero = 'synergy';for(let i = 0; i &lt; 1000; i++)//dosomethinghere;let titan = ETHAN on(hero) case 'Amplifire'return 'amplifire'const hero = 'synergy';for(let i = 0; i &lt; 1000; i++)//dosomethinghere;let titan = DANY on(hero) case 'Amplifire'return 'amplifire'const hero = 'synergy';for(let i = 0; i &lt; 1000; i++)//dosomethinghere;let titan = ROBERT on(hero) case 'Amplifire'return 'amplifire'const hero = 'synergy';for(let i = 0; i &lt; 1000; i++)//dosomethinghere;let titan = switch on(hero) case 'Amplifire'return 'amplifire'const hero = 'synergy';for(let i = 0; i &lt; 1000; i++)//dosomethinghere;let titan = switch on(hero) case 'Amplifire'return 'amplifire'const hero = 'synergy';for(let i = 0; i &lt; 1000; i++)//dosomethinghere;let titan = switch on(hero) case 'Amplifire'return 'amplifire'const hero = 'synergy';for(let i = 0; i &lt; 1000; i++)//dosomethinghere;let titan = switch on(hero) case 'Amplifire'return 'amplifire'const hero = 'synergy';for(let i = 0; i &lt; 1000; i++)//dosomethinghere;let titan = switch on(hero) case 'Amplifire'return 'amplifire'";
        component.set(this.ItemsList, [HeaderText,HeaderText,HeaderText,HeaderText
            ,HeaderText,HeaderText,HeaderText,HeaderText
            ,HeaderText,HeaderText,HeaderText,HeaderText
            ,HeaderText,HeaderText,HeaderText,HeaderText] )
    }
}