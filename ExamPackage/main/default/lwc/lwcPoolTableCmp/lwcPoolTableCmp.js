import { LightningElement, wire, track, api } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import GetQues from "@salesforce/apex/PoolTableApexController.GetQues";
import GetPool from "@salesforce/apex/PoolTableApexController.GetPool";
import deleteQuesPool from "@salesforce/apex/PoolTableApexController.deleteQuesPool";
import TickerSymbol from "@salesforce/schema/Account.TickerSymbol";

export default class LwcPoolTableCmp extends LightningElement {
  @track mydata;
  pools;
  mycolumns = [
    { label: "Question Title", fieldName: "Name", type: "text" },
    { label: "Question Text", fieldName: "Question_Text", type: "text" },
    { label: "Question Type", fieldName: "Question_Type", type: "text" }
  ];

  selectedPools = [];
  selectedRows = [];
  enableToast = true;
  @api searchKeyword = "";
  @api minNum;
  @api maxNum;
  @api pageSize = 10;

  //the current page number
  @api pageNumber = 0;

  isLastPage;
  dataSize = 0;

  //Added by me. Set to true if page # is 1
  firstPage = true;

  connectedCallback() {
    this.searchQues(null);

    //Sets min and max number based on the first page size
    this.minNum = 0;

    if (this.dataSize == 0) {
      this.maxNum = 0;
      this.isLastPage = true;
    } else {
      this.maxNum = this.dataSize - 1;
    }
  }

  //Returns the questions from the apex controller based on page size, number and search keyword
  searchQues(event) {
    //Ensures that the initial call of searchQues does not error from being called with null
    if (event == null) {
      this.searchKeyword = "";
    } else {
      this.searchKeyword = event.detail.value;
    }

    this.pageNumber = this.pageNumber + 1;

    // Getting Values from the client to send to server
    let arrayTextPools = this.selectedPools;
    let selectedObjectPools = [];

    if (this.selectedPools.length > 0) {
      for (let i = 0; i < arrayTextPools.length; i++) {
        for (let j = 0; this.pools.length; j++) {
          if (arrayTextPools[i] == this.pools[j].value) {
            selectedObjectPools.push(this.pools[j]);
          }
        }
      }
    } else {
      selectedObjectPools = null;
    }

    //Calls out to the apex controller for the questions
    GetQues({
      searchKeyword: this.searchKeyword,
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
      pools: this.pools
    })
      .then((result) => {
        this.pageNumber = this.pageNumber - 1;
        let rows = [];
        console.log(result);
        for (let i = 0; i < result.length; i++) {
          let items = {
            Id: result[i].ques[0].Id,
            Name: result[i].ques[0].Name,
            Question_Text: result[i].ques[0].Question_Text_c,
            Question_Type: result[i].ques[0].Question_Type_c
          };
          rows.push(items);
        }
        this.dataSize = rows.length;
        this.mydata = rows;
        this.changePage(0);
      })
      .catch((result) => {
        console.log(result);
      });
  }
  @wire(GetPool)
  pool({ error, data }) {
    if (error) {
      console.log(error);
    } else if (data) {
      let rows = [];
      for (let i = 0; i < data.length; i++) {
        let items = {
          value: data[i].assignedQues[0].Id,
          label: data[i].assignedQues[0].Name,
          Id: data[i].assignedQues[0].Id //????
        };
        rows.push(items);
      }
      this.pools = rows;
    }
  }
  //delete questions
  delQuestionPool() {
    let arrayTexPools = this.selectedPools;
    let selectedObjectPools = [];

    if (this.selectedPools.length > 0) {
      for (let i = 0; i < arrayTextPools.length; i++) {
        for (let j = 0; this.pools.length; j++) {
          if (arrayTextPools[i] == this.pools[j].value) {
            selectedObjectPools.push(this.pools[j]);
          }
        }
      }
    } else {
      selectedObjectPools = null;
    }
    //Detects if the user should not be able to add add questions to pools
    if (
      selectedObjectPools.length <= 0 ||
      this.selectedRows <= 0 ||
      selectedObjectPools == null
    ) {
      selectedObjectPools = null;
      this.selectedRows = null;

      //Toast message
      if (this.enableToast) {
        const event = new ShowToastEvent({
          variant: "error",
          header: "Invalid selections!",
          message: "Please select at least a question to delete from a pool."
        });
        this.dispatchEvent(event);
      }
      //Exit function
      return;
    }
    debugger;

    deleteQuesPool({ pools: selectedObjectPools, questions: this.selectedRows })
      .then((result) => {
        const event = new ShowToastEvent({
          title: "Successfully deleted Questions from the Pools",
          message: "You can check the questions in pool !!!",
          duration: "4000",
          key: "info_alt",
          type: "success",
          mode: "pester"
        });
        this.dispatchEvent(event);

        //refresh the questions table
        let searchKeyword = this.searchKeyword;
        this.searchQues();
      })

      .catch((error) => {
        console.log(error);
      });
  }

  //Used to update the questions
  updateSelectedRows(event) {
    var selectedRows = event.target.getSelectedRows();
    this.selectedRows = selectedRows;
  }
  //Does all logic to safely change pages
  changePage(i) {
    let tempPage = this.pageNumber + i;

    if (tempPage <= 0) {
      this.pageNumber = 0;
      this.firstPage = true;
    } else if (this.dataSize == this.pageSize && this.dataSize != 0) {
      this.pageNumber = tempPage;
      this.firstPage = false;
    }

    if (
      this.dataSize == 0 ||
      this.pageSize == 0 ||
      this.dataSize < this.pageSize
    ) {
      this.isLastPage = true;
    }

    this.minNum = this.pageNumber * this.pageSize;
    this.maxNum = this.minNum + this.dataSize;
  }

  //Shows next results
  handleNext() {
    this.changePage(1);
    this.searchQues();
  }

  //Shows previous results
  handlePrev() {
    this.changePage(-1);
    this.searchQues();
  }

  //Changes the page size
  onSingleSelectChange(event) {
    let singleResult = event.target.value;
    this.pageSize = singleResult;
    this.searchQues();
  }

  displayPoolQues(event) {
    let selectedPools = event.detail.value;
    this.selectedPools = selectedPools;
    this.searchQues();
  }
}
