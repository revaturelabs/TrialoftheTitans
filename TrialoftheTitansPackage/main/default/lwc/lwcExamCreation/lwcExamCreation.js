import { LightningElement, api } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { createRecord } from "lightning/uiRecordApi";
import Exam_Object from "@salesforce/schema/Exam__c";

//Importing Fields
import NAME_FIELD from "@salesforce/schema/Exam__C.Name";
import NEXT_EXAM_FIELD from "@salesforce/schema/Exam__C.Next_Exam__c";
import TITAN_FIELD from "@salesforce/schema/Exam__C.Titan__c";
import DPG_FIELD from "@salesforce/schema/Exam__C.Default_Passing_Grade__c";
import DTL_FIELD from "@salesforce/schema/Exam__C.Default_Time_Limit__c";

/*
    Modified By: William Rembish
    Date: 10/17/2021
    Attempted to get it working enough to run test on at the very least, wasn't able to fully get it working yet but its closer than it was
*/

export default class ExamCreation extends LightningElement {
  @api examObj = Exam_Object;
  @api examId;
  @api nameField = NAME_FIELD;
  @api nextExamField = NEXT_EXAM_FIELD;
  @api titanField = TITAN_FIELD;
  @api dPGField = DPG_FIELD;
  @api dTLField = DTL_FIELD;
  @api titan;
  @api exam;
  @api name = "";
  @api DPG = 0;
  @api DTL = 0;

  //Handler for the exam name for when Hero inputs data into input field
  handleExamName(event) {
    this.examId = undefined;
    this.name = event.target.value;
  }

  //Handler for the Titan(a technology a hero (Account) would like to conquer) for when Hero inputs data into input field
  handleTitanInput(event) {
    this.titan = event.target.value;
  }

  //Handler for the Nextexam name for when Hero inputs data into input field
  handleNextExamInput(event) {
    this.exam = event.target.value;
  }

  //Handler for the Default Passing Grade for when Hero inputs data into input field
  handleDefaultPassingGradeInput(event) {
    this.DPG = event.target.value;
  }

  //Handler for the Default Time Limit for when Hero inputs data into input field
  handleDefaultTimeLimitInput(event) {
    this.DTL = event.target.value;
  }

  //Button submition that creates actual exam record.
  createExam() {
    const fields = {
      [NAME_FIELD.fieldApiName]: this.name,
      [NEXT_EXAM_FIELD.fieldApiName]: this.exam,
      [TITAN_FIELD.fieldApiName]: this.titan,
      [DPG_FIELD.fieldApiName]: this.DPG,
      [DTL_FIELD.fieldApiName]: this.DTL
    };

    const recordInput = {
      apiName: Exam_Object.objectApiName,
      fields: fields
    };

    createRecord(recordInput)
      .then((exam) => {
        console.log(exam);
        this.examId = exam.id;
        this.dispatchEvent(
          new ShowToastEvent({
            title: "Success",
            message: "Exam Created",
            variant: "success"
          })
        );
      })
      .catch((error) => {
        this.dispatchEvent(
          new ShowToastEvent({
            title: "Error in Creating Record",
            message: error.body.message,
            variant: "error"
          })
        );
      });
  }
}
