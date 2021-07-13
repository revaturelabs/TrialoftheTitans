public class HeroJourneyAuraController {
    
    // getTitans() queries the Titan's assigned to the current user based on their curriculum
    // curriculum: used to query the correct titans that fall under the relative curriculum
    // return: list of strings, each string being a titan name 


//    public static List<String> getTitans(Id curriculum){    
	@AuraEnabled
    public static List<String> getTitans(){
        List<String> titans; //= [SELECT Name FROM String WHERE Curriculum__c=:curriculum]; // list titan from titan
        List<String> titanNames = new List<String>();
        
        //for( String t : titans ) { //titan
        	//titanNames.add(t.Name);    
        //}
        
        // permission sets need to be added on creation of org
        titanNames.add('Data Model');
        titanNames.add('Security');
       	titanNames.add('Triggers');
        return titanNames; 
    }

}