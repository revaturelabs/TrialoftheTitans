({
    loadHelper : function(component) {
        var options = component.get("v.options");
        options = options.split("||");
        options.unshift("Select Answer...");
        component.set("v.options", options);
        var answers = component.get("v.answers");
        answers = answers.split("||");
        component.set("v.answers", answers);


        
        for(var a of answers){
            $A.createComponent(
                "lightning:select", {"aura:id" : "answers", "label" : a, "value" : "select"}
            ,
                function(newSelect, status, errorMessage){
                    if(status === "SUCCESS"){
                        var body = component.get("v.body");
                        body.push(newSelect);
                        component.set("v.body", body);
                        newSelect.set("v.body", component.find("iterator"));
                        
                    }
                    else if(status === "INCOMPLETE"){
                        console.log("No response from the server or client side.")
                    }
                    else if(status === "ERROR"){
                        console.log("ERROR: " + errorMessage);
                    }

                }
            );
            }

    }

})