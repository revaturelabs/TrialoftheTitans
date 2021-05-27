({
    // Split each question in text file to its own object and put it in a list.
    // send the list along with titan and technology to ApexController.
    SplitString : function(component, theString, titan, technology) {
        
        // remove comments
        theString = theString.replace(/^.*\/\/.*$/mg, '\n');
        
        // split up each question and answer
        let theSplitString = theString.split(/\r\n\r\n/);
        
        // list of objects 
        // objects holds 3 piece of questions
        let apexObjectList = [];
        
        // cleaning up the items from
        for(let i = 0; i < theSplitString.length; i++){
            
            // get rid of the starting and ending spaces if there is any.
            theSplitString[i] = theSplitString[i].trimEnd();
            
            if(theSplitString[i].lastIndexOf("}") < theSplitString[i].length-1){
                // get text between ::, if none then it just give back blank
                let questionTitle = theSplitString[i].substring(0, theSplitString[i].lastIndexOf("::")+2).replace(/\r?\n|\r/g, '').trim();
                
                // get everything from inside {}
                let questionAnswer = theSplitString[i].substring(theSplitString[i].indexOf("{"), theSplitString[i].indexOf("}")+1).replace(/\r?\n|\r/g, '').trim();
                
                // get everything include the answer after the ::
                let questionText = theSplitString[i].substring(theSplitString[i].lastIndexOf("::")+2).replace(/\r?\n|\r/g, '').trim();
                
                // get rid of the answer part and replace it with 5 underscores
                questionText = questionText.replace(/{.*}/, '_____');
                
                // put all the properties in the object
                let current = {
                    qTitle : questionTitle, 
                    qText: questionText, 
                    qAnswer: questionAnswer
                };
                
                // put the object in the list
                apexObjectList.push(current);
                
            }else{
                
                // get text between ::, if none then it just give back blank
                let questionTitle = theSplitString[i].substring(0, theSplitString[i].lastIndexOf("::")+2).replace(/\r?\n|\r/g, '').trim();
                
                // get text between the last :: and starting {
                let questionText = theSplitString[i].substring(theSplitString[i].lastIndexOf("::")+2, theSplitString[i].lastIndexOf("{")).replace(/\r?\n|\r/g, '').trim();
                
                // get everything from inside {}
                let questionAnswer = theSplitString[i].substring(theSplitString[i].indexOf("{")).replace(/\r?\n|\r/g, '').trim();
                
                // put all the properties in the object
                let current = {
                    qTitle : questionTitle, 
                    qText: questionText, 
                    qAnswer: questionAnswer
                };
                
                // put the object in the list
                apexObjectList.push(current);
            }
        }
        
        // send it to apex.
        console.log('titan:' + titan + ' technology:' + technology);
        console.log(apexObjectList);
        console.log('Apex Goes Here!');
    }
})