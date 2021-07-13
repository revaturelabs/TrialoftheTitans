public with sharing class CohortPageController {
    @AuraEnabled
    public static String returnDomain(){
        String prefix = URL.getSalesforceBaseURL().toExternalForm().replace('https://', '').split('\\.')[0];
		prefix = prefix.removeEnd('--c');
 		return 'https://' + prefix.toLowerCase() + '.lightning.force.com';
    }
}