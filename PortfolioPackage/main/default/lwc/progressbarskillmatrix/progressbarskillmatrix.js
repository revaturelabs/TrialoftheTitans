import { LightningElement, track, api } from 'lwc';
import setProgress from '@salesforce/apex/TestDataClass.setProgress';

export default class Progressbarskillmatrix extends LightningElement {

@track isProgressModalOpen = false;

@track i = 0;
id = 0;
@api
width = 0;
@api endwidth = 100;   //null value will be replaced with default value from database
count = 0;
@api stoploop = 0;
@api progressid;
@api skillprogress;
@api skillid;


//function animates growth to value input by user
move() {
    console.log('move called');
    console.log(this.endwidth);
    if (this.i === 0) {
      this.i = 1;
      let elem = this.template.querySelector('.myBar');
      //console.log(this.template.querySelector("." + this.valueId).innerHTML);
      let elemInnerSpan = this.template.querySelector('.score-percentage');
    //   console.log(elem);
    //   console.log(this.valueId);
    //   console.log(this.progressId);
    //   console.log(elemInnerSpan);
        this.id = setInterval(() => {
            if (this.width >= this.endwidth || this.stoploop >=101) {
                clearInterval(this.id);
                console.log(this.id)
                this.i = 0;
                this.width = 0;
                console.log('cleared');
            } else {
                this.width++;
                this.stoploop++;
                elem.style.width = this.width + '%';
                elemInnerSpan.innerHTML = this.width;

            }
        }, 10);
    }

    
}

// renderedCallback() {
//     console.log('connectedCallback called');
//     this.move();
// }

updateScore() {
    
    let inputValue = this.template.querySelector('.scoreInput').value 
    let validationMessage = this.validateScore(inputValue);
    switch (validationMessage) {
        case "Not a number":
            this.template.querySelector('.scoreInput').value = "";
            this.template.querySelector('.scoreInput').placeholder = "Enter a number";
            this.template.querySelector('.scoreInput').classList.add('error');
            break;
        case "Invalid Score":
            this.template.querySelector('.scoreInput').value = "";
            this.template.querySelector('.scoreInput').placeholder = "Enter a valid score";
            this.template.querySelector('.scoreInput').classList.add('error');
            break;
        case "Valid Score":
            this.template.querySelector('.scoreInput').classList.remove('error');
            this.endwidth = inputValue;
            setProgress({autoNumber: this.progressid, progress: inputValue});
            console.log(inputValue);
            //console.log(this.template.querySelector('.' + this.progressid).className, '********');
            // this.count++;
            this.move();
            //this.isProgressModalOpen = false;
            //refreshApex(this.wireRes);
            break;
        default:
            break;

}

}

validateScore(inputValue){

    if (isNaN(inputValue)) {
        this.template.querySelector('.scoreInput').value = '0';
        return "Not a number";
    }

    if (inputValue > 100 || inputValue < 0) {
        this.template.querySelector('.scoreInput').value = '0';
        this.endwidth = 0;
        return "Invalid Score";
    }

    return "Valid Score";
}

editProgress(){
    this.isProgressModalOpen = true;
    //this.valueId = event.currentTarget.value;
    //this.progressId = event.currentTarget.name;
    // this.progressNumber = event.currentTarget.id;
    // this.progressNum = Number(String(this.progressNumber).slice(0,2));
    // console.log(this.progressNum);
}

closeProgressModal(){
    this.isProgressModalOpen = false;
}

}

