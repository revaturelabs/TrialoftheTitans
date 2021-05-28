public class AuraGIFTParser {
    
    @AuraEnabled
    public static Map<String,List<ExamQuestion>> ImportFile(List<ExamQuestion> questionList, String titan) {
        try {
            List<ExamQuestion> allQuestions = questionList;
            Map<String,List<ExamQuestion>> sortedQuestions = AuraGIFTParser.SortQuestions(allQuestions);
            AuraGIFTParser.CreateRecords(sortedQuestions, titan);
            
            return sortedQuestions;    
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    public static Map<String,List<ExamQuestion>> SortQuestions(List<ExamQuestion> examQuestionList) {
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
            } else if ( examQuestionList[i].qAnswer.length() == 1 && (examQuestionList[i].qAnswer.substring(0).toUpperCase().contains('T') || examQuestionList[i].qAnswer.substring(0).toUpperCase().contains('F'))) {
                trueFalseQuestions.add(examQuestionList[i]);
            } else if (examQuestionList[i].qAnswer.length() >= 5) {
                if (examQuestionList[i].qAnswer.substring(0,5).toUpperCase().contains('FALSE') || examQuestionList[i].qAnswer.substring(0,2).toUpperCase().contains('F#')) {
                    trueFalseQuestions.add(examQuestionList[i]);
                } 
            } else if (examQuestionList[i].qAnswer.length() >= 4) {
                if (examQuestionList[i].qAnswer.substring(0,4).toUpperCase().contains('TRUE') || examQuestionList[i].qAnswer.substring(0,2).toUpperCase().contains('T#')) {
                    trueFalseQuestions.add(examQuestionList[i]);
                } 
            }  else {
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
    
    // essay, numerical, matching, multChoiceMA, multChoice, shortAnswer, trueFalse
    public static void CreateRecords(Map<String,List<ExamQuestion>> sortedQuestions, String titan) {
        List<Exam_Question__c> upsertList = new List<Exam_Question__c>();

        // handle essays
        for (ExamQuestion eq: sortedQuestions.get('Essay')) {
            Exam_Question__c eqc = new Exam_Question__c();
            
            eqc.Question_Type__c = 'Essay';
            eqc.Name = eq.qTitle;
            eqc.Titan__c = titan;
            eqc.Question_Text__c = eq.qText;
            if ( eq.qText.contains('_____') ) {
                eqc.Missing_Word__c = True;    
            } else {
                eqc.Missing_Word__c = False;
            }

            upsertList.add(eqc);
        } 

        // handle numerical
        for (ExamQuestion eq: sortedQuestions.get('Numerical')) {
            Exam_Question__c eqc = new Exam_Question__c();
            
            eqc.Question_Type__c = 'Numerical';
            eqc.Name = eq.qTitle;
            eqc.Titan__c = titan;
            eqc.Question_Text__c = eq.qText;
            if ( eq.qText.contains('_____') ) {
                eqc.Missing_Word__c = True;    
            } else {
                eqc.Missing_Word__c = False;
            }

            //*** convert answer ***//
            // check if has multiple answers first
            if ( eq.qAnswer.contains('=') ) {
                List<String> tempAnswers = eq.qAnswer.substringAfter('#').trim().split('=');

                // remove any null entries
                Integer i = 0;
                while ( i < tempAnswers.size() ) {
                    if ( String.isBlank(tempAnswers.get(i)) ) {
                        tempAnswers.remove(i);
                    } else {
                        i++;
                    }
                }
                System.debug('tempAnswers: ' + tempAnswers);
                
                for ( String ans: tempAnswers) {
                    if (eqc.Answer_Explanation__c == null) {
                        if ( ans.contains('#') ) {
                            eqc.Answer_Explanation__c = ans.substringAfter('#').trim() + '||';
                        } else {
                            eqc.Answer_Explanation__c = '||';
                        }    
                    } else {
                        if ( ans.contains('#') ) {
                            eqc.Answer_Explanation__c = eqc.Answer_Explanation__c + ans.substringAfter('#').trim() + '||';
                        } else {
                            eqc.Answer_Explanation__c = eqc.Answer_Explanation__c + '||';
                        }
                    }
                    if (eqc.Correct_Answer_s__c == null) {
                        if ( ans.contains('#') ) {
                            eqc.Correct_Answer_s__c = ans.substringBefore('#').trim() + '||';
                        } else {
                            eqc.Correct_Answer_s__c = ans.trim() + '||';
                        }    
                    } else {
                        if ( ans.contains('#') ) {
                            eqc.Correct_Answer_s__c = eqc.Correct_Answer_s__c + ans.substringBefore('#').trim() + '||';
                        } else {
                            eqc.Correct_Answer_s__c = eqc.Correct_Answer_s__c + ans.trim() + '||';
                        }
                    } 
                }
            } else {
                if ( eq.qAnswer.substring(1).contains('#') ) {
                    // check if has feedback
                    eqc.Answer_Explanation__c = eq.qAnswer.substringAfterLast('#').trim();
                    eqc.Correct_Answer_s__c = eq.qAnswer.substringBetween('#').trim();
                } else {
                    eqc.Correct_Answer_s__c = eq.qAnswer.substringAfter('#').trim();
                }
            }
            //***/convert answer/***//

            // check if both end in ||
            if ( !String.isBlank(eqc.Answer_Explanation__c) && eqc.Answer_Explanation__c.endsWith('||') ) { 
                eqc.Answer_Explanation__c = eqc.Answer_Explanation__c.removeEnd('||'); 
            }
            if ( !String.isBlank(eqc.Correct_Answer_s__c) && eqc.Correct_Answer_s__c.endsWith('||') ) { 
                eqc.Correct_Answer_s__c = eqc.Correct_Answer_s__c.removeEnd('||'); 
            }
            
            upsertList.add(eqc);
        } 

        // handle matching

        // handle mcma

        // handle mult choice

        // handle short answer
        for (ExamQuestion eq: sortedQuestions.get('Short Answer')) {
            Exam_Question__c eqc = new Exam_Question__c();
            
            eqc.Question_Type__c = 'Short answer';
            eqc.Name = eq.qTitle;
            eqc.Titan__c = titan;
            eqc.Question_Text__c = eq.qText;
            if ( eq.qText.contains('_____') ) {
                eqc.Missing_Word__c = True;    
            } else {
                eqc.Missing_Word__c = False;
            }

            //*** Handle Answer ***//
            if ( eq.qAnswer.contains('=') ) {
                List<String> tempAnswers = eq.qAnswer.trim().split('=');

                // remove any null entries
                Integer i = 0;
                while ( i < tempAnswers.size() ) {
                    if ( String.isBlank(tempAnswers.get(i)) ) {
                        tempAnswers.remove(i);
                    } else {
                        i++;
                    }
                }
                
                for ( String ans: tempAnswers) {
                    if (eqc.Answer_Explanation__c == null) {
                        if ( ans.contains('#') ) {
                            eqc.Answer_Explanation__c = ans.substringAfter('#').trim() + '||';
                        } else {
                            eqc.Answer_Explanation__c = '||';
                        }    
                    } else {
                        if ( ans.contains('#') ) {
                            eqc.Answer_Explanation__c = eqc.Answer_Explanation__c + ans.substringAfter('#').trim() + '||';
                        } else {
                            eqc.Answer_Explanation__c = eqc.Answer_Explanation__c + '||';
                        }
                    }
                    if (eqc.Correct_Answer_s__c == null) {
                        if ( ans.contains('#') ) {
                            eqc.Correct_Answer_s__c = ans.substringBefore('#').trim() + '||';
                        } else {
                            eqc.Correct_Answer_s__c = ans.trim() + '||';
                        }    
                    } else {
                        if ( ans.contains('#') ) {
                            eqc.Correct_Answer_s__c = eqc.Correct_Answer_s__c + ans.substringBefore('#').trim() + '||';
                        } else {
                            eqc.Correct_Answer_s__c = eqc.Correct_Answer_s__c + ans.trim() + '||';
                        }
                    }
                }
            } else {
                if ( eq.qAnswer.contains('#') ) {
                    eqc.Correct_Answer_s__c = eq.qAnswer.substringBefore('#');
                    eqc.Answer_Explanation__c = eq.qAnswer.substringAfter('#');
                } else {
                    eqc.Correct_Answer_s__c = eq.qAnswer;
                }
            }
            //***/Handle Answer/***//

            // check if both end in ||
            if ( !String.isBlank(eqc.Answer_Explanation__c) && eqc.Answer_Explanation__c.endsWith('||') ) { 
                eqc.Answer_Explanation__c = eqc.Answer_Explanation__c.removeEnd('||'); 
            }
            if ( !String.isBlank(eqc.Correct_Answer_s__c) && eqc.Correct_Answer_s__c.endsWith('||') ) { 
                eqc.Correct_Answer_s__c = eqc.Correct_Answer_s__c.removeEnd('||'); 
            }

            upsertList.add(eqc);
        } 

        // handle truefalse
        for (ExamQuestion eq: sortedQuestions.get('True-False')) {
            Exam_Question__c eqc = new Exam_Question__c();
            
            eqc.Question_Type__c = 'True-false';
            eqc.Name = eq.qTitle;
            eqc.Titan__c = titan;
            eqc.Question_Text__c = eq.qText;
            if ( eq.qText.contains('_____') ) {
                eqc.Missing_Word__c = True;    
            } else {
                eqc.Missing_Word__c = False;
            }
            if (eq.qAnswer.contains('#')) {
                eqc.Answer_Explanation__c = eq.qAnswer.substringAfter('#');
            }

            // convert the answer
            if ( eq.qAnswer.substring(0,1).toUpperCase().contains('T') || eq.qAnswer.substring(0,4).toUpperCase().contains('TRUE') ) {
                eqc.Correct_Answer_s__c = 'TRUE';   
            } else {
                eqc.Correct_Answer_s__c = 'FALSE';
            }

            upsertList.add(eqc);
        } 
		System.debug(upsertList);
        upsert upsertList;
    }

    @AuraEnabled
    public static Map<String,List<Map<String,String>>> HandleInit() {
        try {
            Map<String,List<Map<String,String>>> initialValueMap = new Map<String,List<Map<String,String>>>();
            List<Titan__c> titanList = [SELECT Name, Id, Technology__c FROM Titan__c];

            // create titan name + id lists, plus technology list
            List<String> titanNameList = new List<String>();
            List<String> titanIdList = new List<String>();
            List<String> titanTechnologyList = new List<String>();

            for ( Titan__c t: titanList ) {
                titanNameList.add(t.Name);
                titanIdList.add(t.Id);
                titanTechnologyList.add(t.Technology__c);
            }

            // create maps
            List<Map<String,String>> technologyMapList = new List<Map<String,String>>();
            List<Map<String,String>> titanMapList = new List<Map<String,String>>();

            for ( Integer i = 0; i < titanTechnologyList.size(); i++ ) {
                Map<String,String> tempMap = new Map<String,String>();
                tempMap.put('TitanId',titanIdList[i]);
                tempMap.put('TechnologyName',titanTechnologyList[i]);
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