import { LightningElement, track, api } from 'lwc';
import setProgress from '@salesforce/apex/TestDataClass.setProgress';

export default class Progressbarskillmatrix extends LightningElement {

@track isProgressModalOpen = false;

////////////////////////Mountain's code//////////////////////////////

@track i = 0;
id = 0;
@api
width = 0;
@api endwidth = 100;   //null value will be replaced with default value from database
count = 0;
@api progressid;
@api skillprogress;
@api skillid;


//function animates growth to value input by user
move() {
    console.log('move called');
    console.log(this.endwidth, "endwidth");
    if (this.i === 0) {
      this.i = 1;
      let elem = this.template.querySelector('.myBar');
      //console.log(this.template.querySelector("." + this.valueId).innerHTML);
      let elemInnerSpan = this.template.querySelector('.score-percentage');
       console.log(elem, "elem");
    //   console.log(this.valueId);
    //   console.log(this.progressId);
       console.log(elemInnerSpan.innerHTML, "innerspan");
        this.id = setInterval(() => {
            if (this.width >= this.endwidth) {
                clearInterval(this.id);
                console.log(this.id, "id");
                this.i = 0;
                this.width = 0;
                console.log('cleared');
            } else {
                this.width++;
                console.log("updates the progress")
                elem.style.width = this.width + '%';
                elemInnerSpan.innerHTML = this.width;

            }
        }, 10);
    }

    
}

renderedCallback() {
    if(this.isProgressModalOpen == true && this.width >= this.endwidth){
        console.log('Dont move bar.');
    }
    else{
        this.move();
    }
    
}

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
            /////Gabe's method//////
            setProgress({autoNumber: this.progressid, progress: inputValue});
            /////Gabe's method//////
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

////////////////////////Mountain's code//////////////////////////////////


editProgress(){
    this.isProgressModalOpen = true;
}

closeProgressModal(){
    this.isProgressModalOpen = false;
}

}

