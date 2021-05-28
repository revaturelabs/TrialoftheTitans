@isTest
public class RemoveMultiselectBarsTestClass {
    
    //Testing to see if the Multibars || are removed
    
    @isTest
    static void MultiSelectFlowValuesTest(){ 
        List<string> tempLst = new list<string>();
        tempLst.add('OurStringWithBars||');
        List<string> actualResult = RemoveMultiselectBars.RemoveBars(tempLst);
        List<string> expectedResult = new List<string>();
        expectedResult.add('OurStringWithBars');
        System.assertEquals(expectedResult, actualResult);
    }
}