public class QuestionFlagUpdates {
    
    /* Retrieves an Exam_Question by looking up its Id.
     * If the question is found, it checks to see if it is already flagged.
     * 
     * If the question is flagged, this method returns the following:
     * 0 - The flag category
     * 1 - The flag subcategory
     * 2 - The flag notes, if any
     * 
     * If the question is not flagged, this method returns an empty List.
     * 
     * If the question cannot be found, this method returns null.
     */
    @AuraEnabled(cacheable=true)
    public static List<String> lookupQuestion(Id questionId){
        try{
            Exam_Question__c question = [SELECT Id, IsFlagged__c, Flag_Category__c, Flag_Subcategory__c, Flag_Notes__c FROM Exam_Question__c WHERE Id = :questionId LIMIT 1];
            List<String> results = new List<String>();
            if (question.IsFlagged__c){
                results[0] = question.Flag_Category__c;
                results[1] = question.Flag_Subcategory__c;
                results[2] = question.Flag_Notes__c;
            }
            return results;
        } catch (QueryException e){
            return null;
        }
    }

    /* Marks an Exam_Question as flagged by looking up its Id.
     * Also sets the category, subcategory, and notes.
     * 
     * If the question is successfully flagged, returns true.
     * Otherwise, returns false.
     */
    @AuraEnabled
    public static Boolean flagQuestion(Id questionId, String category, String subcategory, String notes){
        try{
            Exam_Question__c question = [SELECT Id, IsFlagged__c, Flag_Category__c, Flag_Subcategory__c, Flag_Notes__c FROM Exam_Question__c WHERE Id = :questionId LIMIT 1];
            List<Schema.PicklistEntry> categories = Exam_Question__c.Flag_Category__c.getDescribe().getPicklistValues();
            List<Schema.PicklistEntry> subcategories = Exam_Question__c.Flag_Subcategory__c.getDescribe().getPicklistValues();
            question.Flag_Notes__c = notes;
            return true;
        } catch (QueryException e){
            return false;
        }
    }
}
