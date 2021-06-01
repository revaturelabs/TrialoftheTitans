@isTest
public class MultiSelectFlowValuesTestClass{   
    
    //Testing the parser, it should separate out the list
    
    @isTest
    static void MultiSelectFlowValuesTest(){ 
        List<string> tempLst = new list<string>();
        tempLst.add('AccidentalCoder');
        tempLst.add('Salesforce');
        MultiselectFlowvalues.CheckValues(tempLst);
    }
    
    //Testing the negative Case

    @isTest
    static void NegativeCase(){
        List<string> tempList = new list<string>();
        MultiSelectFlowValues.CheckValues(tempList);
    }
    
}