({
    SubmitMessage : function(component, event, helper) {
        let message = document.querySelector( "#message-body" );
        let sendEvent = component.getEvent( "MessageSendEvent" );

        sendEvent.setParams( { "message" : message.value, "activeTab" : component.get( "v.activeTab" ) } );
        sendEvent.fire();
        message.value = "";
    }
})
