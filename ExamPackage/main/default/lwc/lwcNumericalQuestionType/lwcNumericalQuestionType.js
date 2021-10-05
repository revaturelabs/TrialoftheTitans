import { LightningElement,api ,track} from 'lwc';

export default class NumericalQuestionType extends LightningElement {
  //replaces the public attributes above
@api questionprompt = '';
@track name;
/*
showMe(event) {
  this.name=event.target.value;
  alert(this.name); 
  
}
*/
//same as remove item above
@api
answer() {
  if(element.name=="input1"){
    this.name=element.value;
  }
  this.answer = element.value;

    
}

}