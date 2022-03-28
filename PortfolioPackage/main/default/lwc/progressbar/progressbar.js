import { LightningElement, track, api } from 'lwc';

class ProgressBar extends LightningElement {

@track i = 0;
id = 0;
@api
width = 0;
@api
endwidth = 100;   
stoploop = 0;


//function animates growth to value input by user
move() {
    console.log('move called');
    console.log(this.endwidth);
    if (this.i === 0) {
      this.i = 1;
      let elem = this.template.querySelector('.myBar');
      let elemInnerSpan = this.template.querySelector('.score-percentage');
      console.log(elem);
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


renderedCallback() {
    console.log('connectedCallback called');
    this.move();
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
            this.move();
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


}


export default ProgressBar;