public class AuraGIFTParser {
    // *** VARIABLES *** //
    // public Map<String,List<ExamQuestion>> sortedExamList { get; set; }
    
    // Aura
    @AuraEnabled
    public static Map<String,List<ExamQuestion>> ImportFile(List<ExamQuestion> questionList) {
        try {
            List<ExamQuestion> allQuestions = questionList;
            System.debug(questionList);
            System.debug(allQuestions);
            Map<String,List<ExamQuestion>> sortedQuestions = AuraGIFTParser.sortQuestions(allQuestions);
            // AuraGIFTParser.createRecords
            
            return sortedQuestions;    
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        
    }
    // essay, numerical, matching, multChoiceMA, multChoice, shortAnswer, trueFalse
    public static Map<String,List<ExamQuestion>> sortQuestions(List<ExamQuestion> examQuestionList) {
        Map<String,List<ExamQuestion>> sortedQuestions = new Map<String,List<ExamQuestion>>();
        List<ExamQuestion> essayQuestions = new List<ExamQuestion>();
        List<ExamQuestion> numericalQuestions = new List<ExamQuestion>();
        List<ExamQuestion> matchingQuestions = new List<ExamQuestion>();
        List<ExamQuestion> multChoiceMAQuestions = new List<ExamQuestion>();
        List<ExamQuestion> multChoiceQuestions = new List<ExamQuestion>();
        List<ExamQuestion> shortAnswerQuestions = new List<ExamQuestion>();
        List<ExamQuestion> trueFalseQuestions = new List<ExamQuestion>();

        // Check for question characteristics and sort into lists
        for ( Integer i = 0; i < examQuestionList.size(); i++ ) {
            if ( examQuestionList[i].qAnswer.containsOnly('{}') ) {
                essayQuestions.add(examQuestionList[i]);
            } else if ( examQuestionList[i].qAnswer.substring(0,1).contains('#') ) {
                numericalQuestions.add(examQuestionList[i]);
            } else if ( examQuestionList[i].qAnswer.contains('->') ) {
                matchingQuestions.add(examQuestionList[i]);
            } else if ( examQuestionList[i].qAnswer.contains('~') && examQuestionList[i].qAnswer.contains('%')) {
                multChoiceMAQuestions.add(examQuestionList[i]);
            } else if ( examQuestionList[i].qAnswer.contains('~') && examQuestionList[i].qAnswer.countMatches('=') == 1) {
                multChoiceQuestions.add(examQuestionList[i]);
            } else if ( examQuestionList[i].qAnswer.contains('=') && !examQuestionList[i].qAnswer.contains('~') ) {
                shortAnswerQuestions.add(examQuestionList[i]);
            } else if ( examQuestionList[i].qAnswer.toUpperCase().contains('T') || examQuestionList[i].qAnswer.toUpperCase().contains('F') || examQuestionList[i].qAnswer.toUpperCase().contains('TRUE') || examQuestionList[i].qAnswer.toUpperCase().contains('FALSE') ) {
                trueFalseQuestions.add(examQuestionList[i]);
            } else {
                shortAnswerQuestions.add(examQuestionList[i]);
            }
            
        }

        // Put lists into map
        sortedQuestions.put('Essay', essayQuestions);
        sortedQuestions.put('Numerical', numericalQuestions);
        sortedQuestions.put('Matching', matchingQuestions);
        sortedQuestions.put('MCMA', multChoiceMAQuestions);
        sortedQuestions.put('Multiple Choice', multchoiceQuestions);
        sortedQuestions.put('Short Answer', shortAnswerQuestions);
        sortedQuestions.put('True-False', trueFalseQuestions);
        return sortedQuestions;
    }
        
    @AuraEnabled
    public static Map<String,List<Map<String,String>>> HandleInit() {
        try {
            Map<String,List<Map<String,String>>> initialValueMap = new Map<String,List<Map<String,String>>>();
            List<Technology__c> technologyList = [SELECT Name, Id FROM Technology__c];
            List<Titan__c> titanList = [SELECT Name, Id FROM Titan__c];

            // create technology + titan name + id lists
            List<String> technologyNameList = new List<String>();
            List<String> technologyIdList = new List<String>();
            List<String> titanNameList = new List<String>();
            List<String> titanIdList = new List<String>();

            for ( Technology__c t: technologyList ) {
                technologyNameList.add(t.Name);
                technologyIdList.add(t.Id);
            }
            for ( Titan__c t: titanList ) {
                titanNameList.add(t.Name);
                titanIdList.add(t.Id);
            }

            System.debug(technologyNameList);
            System.debug(technologyIdList);
            System.debug(titanNameList);
            System.debug(titanIdList);

            // create maps
            List<Map<String,String>> technologyMapList = new List<Map<String,String>>();
            List<Map<String,String>> titanMapList = new List<Map<String,String>>();

            for ( Integer i = 0; i < technologyList.size(); i++ ) {
                Map<String,String> tempMap = new Map<String,String>();
                tempMap.put('Name',technologyNameList[i]);
                tempMap.put('Id',technologyIdList[i]);
                technologyMapList.add(tempMap);
            }
            for ( Integer j = 0; j < titanList.size(); j++ ) {
                Map<String,String> tempMap = new Map<String,String>();
                tempMap.put('Name',titanNameList[j]);
                tempMap.put('Id',titanIdList[j]);
                titanMapList.add(tempMap);
            }
            initialValueMap.put('Technologies',technologyMapList);
            initialValueMap.put('Titans',titanMapList);

            return initialValueMap;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}