import { LightningElement, track } from 'lwc';

class ProgressBar extends LightningElement {

@track i = 0;
id = 0;
width = 0;
endwidth = 100;   //null value will be replaced with default value from database


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
            if (this.width >= this.endwidth) {
                clearInterval(this.id);
                console.log(this.id)
                this.i = 0;
                this.width = 0;
                console.log('cleared');
            } else {
                this.width++;
                elem.style.width = this.width + '%';
                elemInnerSpan.innerHTML = this.width + '%';

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