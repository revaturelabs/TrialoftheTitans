https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.use_message_channel_intro
the above link is the only docs i found for app events.  seems like its a beta feature.
was confused about what exactly they wanted but since it only specified to use metadata then that'll do.
use this cmd in .js to import:
import fieldname from '@salesforce/messageChannel/exam__c';
where fieldname is the field you're referring to.
i didn't populate the fields in metadata because i didn't know what exactly is or isn't being used w/ this app event.
it's as simple as following what the docs here say: https://developer.salesforce.com/docs/atlas.en-us.232.0.api_meta.meta/api_meta/meta_lightningmessagechannel.htm#:~:text=Represents%20the%20metadata%20associated%20with,Aura%20Components%2C%20and%20Visualforce)