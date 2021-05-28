////////////////////////////////////////////////////
//
// Name: Exam Question Class
// Author: David J. Sellinger
// Created: 2021-05-26
// Updated: 2021-05-27
// Description: Custom class for receiving data from
//              aura controller (GIFT-formatted
//              questions) for manipulation in Apex.
//
////////////////////////////////////////////////////

public class ExamQuestion {
    @AuraEnabled
    public String qTitle { get; set; }
    @AuraEnabled
    public String qText { get; set; }
    @AuraEnabled
    public String qAnswer { get; set; }
    @AuraEnabled
    public String qId { get; set; }
}
