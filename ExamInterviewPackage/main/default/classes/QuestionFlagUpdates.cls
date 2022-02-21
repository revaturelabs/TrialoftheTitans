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
            // Look up the question. Searching by Id should only get one result anyway, but limiting it to 1 won't hurt.
            // If an exception occurs, that means there was no question with that Id.
            Exam_Question__c question = [SELECT Id, IsFlagged__c, Flag_Category__c, Flag_Notes__c FROM Exam_Question__c WHERE Id = :questionId LIMIT 1];
            // Make an empty list.
            List<String> results = new List<String>();
            // If the question is flagged, fill the list before returning it.
            if (question.IsFlagged__c){
                results[0] = question.Flag_Category__c;
                results[1] = question.Flag_Notes__c;
            }
            return results;
        } catch (QueryException e){
            return null;
        }
    }

    /* Marks an Exam_Question as flagged by looking up its Id.
     * Also sets the category, subcategory, and notes.
     * 
     * This method expects the labels of the category and subcategory as input, not the values.
     * 
     * If the question is successfully flagged, returns true.
     * Otherwise, returns false.
     */
    @AuraEnabled
    public static Boolean flagQuestion(Id questionId, String category, String notes){
        try{
            // Look up the question. Searching by Id should only get one result anyway, but limiting it to 1 won't hurt.
            // If an exception occurs, that means there was no question with that Id.
            Exam_Question__c question = [SELECT Id, IsFlagged__c, Flag_Category__c, Flag_Notes__c FROM Exam_Question__c WHERE Id = :questionId LIMIT 1];
            // Mark the question as flagged.
            question.IsFlagged__c = true;
            // Update the notes.
            question.Flag_Notes__c = notes;
            // It's a bit trickier to update the category, since we have to validate against the possible values.
            // We set up a code flag, iterate through the possible values, and set the question's category if we
            // find a possible value that matched the label that was passed in.
            Boolean matched = false;
            List<Schema.PicklistEntry> categories = Exam_Question__c.Flag_Category__c.getDescribe().getPicklistValues();
            for (Schema.PicklistEntry cat : categories){
                if (!matched && category == cat.getLabel()){
                    question.Flag_Category__c = cat.getValue();
                    matched = true;
                }
            }

            // If everything worked, we can update the question.
            update question;
            return true;
        } catch (QueryException e){
            return false;
        }
    }
}
