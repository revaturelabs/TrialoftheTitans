////////////////////////////////////////////////////
//
// Name: Trial of the Titans - GIFT Import
//					 			Apex Controller
// Author: David J. Sellinger
// Created: 2021-05-24
// Updated: 2021-05-31
// Description: Server-side controller for parsing
//              questions listed in GIFT format and
//              inserting them into the database.
//
////////////////////////////////////////////////////

public class AuraGIFTImportController {
	
	// ImportFile(): Imports file from Aura component and readies questions for parsing.
	//
	// List<ExamQuestion> questionList: inputs the split questions from their JavaScript and 
	//                  puts them in instances of the ExamQuestion custom class.
	// String titan: the Id of the titan to be attached to each question in the import.
	//
	// returns List<Integer> result: the result of the parsing, a List<Integer>{created,updated}; 
	//                  returned to the Aura javascript helper.

	@AuraEnabled
	public static List<Integer> ImportFile(List<ExamQuestion> questionList, String titan) {
		List<Integer> result = new List<Integer>();
		try {
			List<ExamQuestion> allQuestions = questionList;
			// List<Exam_Question__c> existingQuestions = [SELECT Name, Id FROM Exam_Question__c];

			// check for empty titles to help them be identifiable
			for ( Integer c = 0; c < allQuestions.size(); c++ ) {
				if ( String.isBlank(allQuestions[c].qTitle) ) {
					if ( allQuestions[c].qText.length() <= 80 ) {
						allQuestions[c].qTitle = allQuestions[c].qText;
					} else {
						allQuestions[c].qTitle = allQuestions[c].qText.substring(0, 79);
					}
				}
			}

			Map<String,List<ExamQuestion>> sortedQuestions = AuraGIFTImportController.SortQuestions(allQuestions);
			result = AuraGIFTImportController.CreateRecords(sortedQuestions, titan);
		} catch (Exception e) {
			System.debug(e.getMessage());
		}
		return result;
	}
	
	// SortQuestions(): Takes the ExamQuestion list and sorts them based on their type: essay, numerical,
	//                      matching, MCMA, multiple choice, short answer, true false.
	//
	// examQuestionList: the List<ExamQuestion> imported by ImportFile().
	//
	// returns Map<String,List<ExamQuestion>>sortedQuestion: a Map of Strings to List<ExamQuestion>.
	//						The lists hold the ExamQuestion types.

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
			if ( String.isBlank(examQuestionList[i].qAnswer) ) {
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
				} else {
					shortAnswerQuestions.add(examQuestionList[i]);
				}
			} else if (examQuestionList[i].qAnswer.length() >= 4) {
				if (examQuestionList[i].qAnswer.substring(0,4).toUpperCase().contains('TRUE') || examQuestionList[i].qAnswer.substring(0,2).toUpperCase().contains('T#')) {
					trueFalseQuestions.add(examQuestionList[i]);
				} else {
					shortAnswerQuestions.add(examQuestionList[i]);
				}
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
	
	// CreateRecords(): The powerhouse of the controller. Takes the list of sorted questions, maps them
	// 						to instances of Exam_Question__c, and then upserts them based on their title (Name field).
	//
	// Map<String,List<ExamQuestion>> sortedQuestions: the map of lists of sorted questions created by SortQuestions().
	// String titan: the Id of the relevant titan.
	//
	// returns List<Integer> userFeedback: a list holding the number of created and updated questions

	public static List<Integer> CreateRecords(Map<String,List<ExamQuestion>> sortedQuestions, String titan) {
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
				
				for ( String ans: tempAnswers) {
					if ( eqc.Answer_Explanation__c == null ) {
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
					if ( eqc.Correct_Answer_s__c == null ) {
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
		for (ExamQuestion eq: sortedQuestions.get('Matching')) {
			Exam_Question__c eqc = new Exam_Question__c();
			
			eqc.Question_Type__c = 'Matching';
			eqc.Name = eq.qTitle;
			eqc.Titan__c = titan;
			eqc.Question_Text__c = eq.qText;
			if ( eq.qText.contains('_____') ) {
				eqc.Missing_Word__c = True;
			} else {
				eqc.Missing_Word__c = False;
			}

			//*** Handle Answer ***//
			List<String> tempAnswers = eq.qAnswer.split('=');
			
			// remove any null entries
			Integer i = 0;
			while ( i < tempAnswers.size() ) {
				if ( String.isBlank(tempAnswers.get(i)) ) {
					tempAnswers.remove(i);
				} else {
					i++;
				}
			}

			for ( String ans: tempAnswers ) {
				if ( eqc.Correct_Answer_s__c == null ) {
					eqc.Correct_Answer_s__c = ans.substringBefore('-').trim() + '||';
				} else {
					eqc.Correct_Answer_s__c = eqc.Correct_Answer_s__c + ans.substringBefore('-').trim() + '||';
				}
				if ( eqc.Answer_Explanation__c == null ) {
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
				if ( eqc.Options__c == null ) {
					if ( ans.contains('#') ) {
						eqc.Options__c = ans.substringBetween('>', '#').trim() + '||';
					} else {
						eqc.Options__c = ans.substringAfter('>').trim() + '||';
					}    
				} else {
					if ( ans.contains('#') ) {
						eqc.Options__c = eqc.Options__c + ans.substringBetween('>', '#').trim() + '||';
					} else {
						eqc.Options__c = eqc.Options__c + ans.substringAfter('>').trim() + '||';
					}
				} 
			}
			//***/Handle Answer/***//

			// check if both end in ||
			if ( !String.isBlank(eqc.Answer_Explanation__c) && eqc.Answer_Explanation__c.endsWith('||') ) { 
				eqc.Answer_Explanation__c = eqc.Answer_Explanation__c.removeEnd('||');
			}
			if ( !String.isBlank(eqc.Answer_Explanation__c) && eqc.Answer_Explanation__c.containsOnly('||') ) { 
				eqc.Answer_Explanation__c = ''; 
			}
			if ( !String.isBlank(eqc.Correct_Answer_s__c) && eqc.Correct_Answer_s__c.endsWith('||') ) { 
				eqc.Correct_Answer_s__c = eqc.Correct_Answer_s__c.removeEnd('||'); 
			}
			if ( !String.isBlank(eqc.Options__c) && eqc.Options__c.endsWith('||') ) { 
				eqc.Options__c = eqc.Options__c.removeEnd('||'); 
			}

			upsertList.add(eqc);
		}

		// handle mcma
		for (ExamQuestion eq: sortedQuestions.get('MCMA')) {
			Exam_Question__c eqc = new Exam_Question__c();
			
			eqc.Question_Type__c = 'Multiple Choice - multiple answers';
			eqc.Name = eq.qTitle;
			eqc.Titan__c = titan;
			eqc.Question_Text__c = eq.qText;
			if ( eq.qText.contains('_____') ) {
				eqc.Missing_Word__c = True;
			} else {
				eqc.Missing_Word__c = False;
			}

			//*** Handle Answer ***//
			List<String> allAnswers = eq.qAnswer.trim().split('~');
			List<String> tempAnswers = new List<String>();
			for ( String tA: allAnswers ) {
				if ( tA.contains('%') ) {
					tempAnswers.add(tA.replaceAll('(%.{1,3}%)',''));
				}
			}

			eq.qAnswer = eq.qAnswer.replaceAll('(%.{1,3}%)','');
			List<String> tempOptions = eq.qAnswer.trim().split('~');

			/*// remove any null entries
			Integer i = 0;
			while ( i < tempAnswers.size() ) {
				if ( String.isBlank(tempAnswers.get(i)) ) {
					tempAnswers.remove(i);
				} else {
					i++;
				}
			}*/

			Integer j = 0;
			while ( j < tempOptions.size() ) {
				if ( String.isBlank(tempOptions.get(j)) ) {
					tempOptions.remove(j);
				} else {
					j++;
				}
			}
			
			// handle correct answers
			for ( String ans: tempAnswers) {
				if ( eqc.Correct_Answer_s__c == null ) {
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

			// handle options and answer explanations
			for ( String opt: tempOptions) {
				if ( eqc.Answer_Explanation__c == null ) {
					if ( opt.contains('#') ) {
						eqc.Answer_Explanation__c = opt.substringAfter('#').trim() + '||';
					} else {
						eqc.Answer_Explanation__c = '||';
					}    
				} else {
					if ( opt.contains('#') ) {
						eqc.Answer_Explanation__c = eqc.Answer_Explanation__c + opt.substringAfter('#').trim() + '||';
					} else {
						eqc.Answer_Explanation__c = eqc.Answer_Explanation__c + '||';
					}
				}
				if (eqc.Options__c == null) {
					if ( opt.contains('#') ) {
						eqc.Options__c = opt.substringBefore('#').trim() + '||';
					} else {
						eqc.Options__c = opt.trim() + '||';
					}    
				} else {
					if ( opt.contains('#') ) {
						eqc.Options__c = eqc.Options__c + opt.substringBefore('#').trim() + '||';
					} else {
						eqc.Options__c = eqc.Options__c + opt.trim() + '||';
					}
				}
			}
			//***/Handle Answer/***//

			// check if both end in ||
			if ( !String.isBlank(eqc.Answer_Explanation__c) && eqc.Answer_Explanation__c.endsWith('||') ) { 
				eqc.Answer_Explanation__c = eqc.Answer_Explanation__c.removeEnd('||');
			}
			if ( !String.isBlank(eqc.Answer_Explanation__c) && eqc.Answer_Explanation__c.containsOnly('||') ) { 
				eqc.Answer_Explanation__c = ''; 
			}
			if ( !String.isBlank(eqc.Correct_Answer_s__c) && eqc.Correct_Answer_s__c.endsWith('||') ) { 
				eqc.Correct_Answer_s__c = eqc.Correct_Answer_s__c.removeEnd('||'); 
			}
			if ( !String.isBlank(eqc.Options__c) && eqc.Options__c.endsWith('||') ) { 
				eqc.Options__c = eqc.Options__c.removeEnd('||'); 
			}

			upsertList.add(eqc);
		}

		// handle mult choice
		for (ExamQuestion eq: sortedQuestions.get('Multiple Choice')) {
			Exam_Question__c eqc = new Exam_Question__c();
			
			eqc.Question_Type__c = 'Multiple Choice';
			eqc.Name = eq.qTitle;
			eqc.Titan__c = titan;
			eqc.Question_Text__c = eq.qText;
			if ( eq.qText.contains('_____') ) {
				eqc.Missing_Word__c = True;
			} else {
				eqc.Missing_Word__c = False;
			}

			//*** Handle Answer ***//
			// change delimiter to \n
			eq.qAnswer = eq.qAnswer.replaceAll('[=]','\n=');
			eq.qAnswer = eq.qAnswer.replaceAll('[~]','\n~');
			
			// split at \n
			List<String> tempAnswers = eq.qAnswer.split('\n');
			
			// remove any null entries
			Integer i = 0;
			while ( i < tempAnswers.size() ) {
				if ( String.isBlank(tempAnswers.get(i)) ) {
					tempAnswers.remove(i);
				} else {
					i++;
				}
			}
			

			for ( String ans: tempAnswers ) {
				if ( ans.substring(0,1).contains('=') ) {
					if ( ans.contains('#') ) {
						eqc.Correct_Answer_s__c = ans.substringBetween('=', '#').trim() + '||';
					} else {
						eqc.Correct_Answer_s__c = ans.substringAfter('=').trim() + '||';
					}
					if ( eqc.Answer_Explanation__c == null ) {
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
					if ( eqc.Options__c == null ) {
						if ( ans.contains('#') ) {
							eqc.Options__c = ans.substringBetween('=', '#').trim() + '||';
						} else {
							eqc.Options__c = ans.substringAfter('=').trim() + '||';
						}    
					} else {
						if ( ans.contains('#') ) {
							eqc.Options__c = eqc.Options__c + ans.substringBetween('=', '#').trim() + '||';
						} else {
							eqc.Options__c = eqc.Options__c + ans.substringAfter('=').trim() + '||';
						}
					} 
				} else {
					if ( eqc.Answer_Explanation__c == null ) {
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
					if ( eqc.Options__c == null ) {
						if ( ans.contains('#') ) {
							eqc.Options__c = ans.substringBetween('~', '#').trim() + '||';
						} else {
							eqc.Options__c = ans.substringAfter('~').trim() + '||';
						}    
					} else {
						if ( ans.contains('#') ) {
							eqc.Options__c = eqc.Options__c + ans.substringBetween('~', '#').trim() + '||';
						} else {
							eqc.Options__c = eqc.Options__c + ans.substringAfter('~').trim() + '||';
						}
					}
				}
			}
			//***/Handle Answer/***//

			// check if both end in ||
			if ( !String.isBlank(eqc.Answer_Explanation__c) && eqc.Answer_Explanation__c.endsWith('||') ) { 
				eqc.Answer_Explanation__c = eqc.Answer_Explanation__c.removeEnd('||');
			}
			if ( !String.isBlank(eqc.Answer_Explanation__c) && eqc.Answer_Explanation__c.containsOnly('||') ) { 
				eqc.Answer_Explanation__c = ''; 
			}
			if ( !String.isBlank(eqc.Correct_Answer_s__c) && eqc.Correct_Answer_s__c.endsWith('||') ) { 
				eqc.Correct_Answer_s__c = eqc.Correct_Answer_s__c.removeEnd('||'); 
			}
			if ( !String.isBlank(eqc.Options__c) && eqc.Options__c.endsWith('||') ) { 
				eqc.Options__c = eqc.Options__c.removeEnd('||'); 
			}

			upsertList.add(eqc);
		}

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
					if ( eqc.Answer_Explanation__c == null ) {
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
					if ( eqc.Correct_Answer_s__c == null ) {
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
			if ( !String.isBlank(eqc.Answer_Explanation__c) && eqc.Answer_Explanation__c.containsOnly('||') ) { 
				eqc.Answer_Explanation__c = ''; 
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
			if ( (eq.qAnswer.length() == 1 && eq.qAnswer.substring(0,1).toUpperCase().contains('T')) || (eq.qAnswer.length() > 1 && (eq.qAnswer.substring(0,4).toUpperCase().contains('TRUE') || eq.qAnswer.substring(0,2).toUpperCase().contains('T#'))) ) {
				eqc.Correct_Answer_s__c = 'TRUE';   
			} else {
				eqc.Correct_Answer_s__c = 'FALSE';
			}

			upsertList.add(eqc);
		} 

		List<Database.UpsertResult> uResult = Database.upsert(upsertList,Exam_Question__c.Fields.Name);

		Integer createCount = 0;
		Integer successCount = 0;
		for ( Database.UpsertResult res: uResult  ) {
			if (res.isCreated()) {
				createCount++;
			}
			if (res.isSuccess()) {
				successCount++;
			}
		}

		Integer updateCount = successCount - createCount;
		List<Integer> userFeedback = new List<Integer>{createCount,updateCount};

		return userFeedback;
	}

	// HandleInit(): Handles the initialization of initial values for the Aura component.
	// 
	// returns Map<String,List<Map<String,String>>> initialValueMap: map of values for the picklists shown
	//					on the aura component.

	@AuraEnabled
	public static Map<String,List<Map<String,String>>> HandleInit() {
		Map<String,List<Map<String,String>>> initialValueMap = new Map<String,List<Map<String,String>>>();
		try {
            List<Titan__c> titanList = [SELECT Name, Id, Technology__c FROM Titan__c];
			
            // If no titans have been created yet, org is obviously in testing
            // Create test titan to avoid errors in the Aura controller
            if ( titanList.size() == 0 ) {
                Titan__c titan = new Titan__c(Name = 'Test Titan', Technology__c = 'Salesforce');
                insert titan;
                titanList.add(titan);
            }
            
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
			
			if(Test.isRunningTest()) {
				Integer error = 1/0;
			}
		} catch (Exception e) {
			System.debug(e.getMessage());
		}
		return initialValueMap;
	}
}