({
    SubmitMessage : function(component, event, helper) {
        
        let message = document.querySelector( "#message-body" );
        let sendEvent = component.getEvent( "MessageSendEvent" );

        //If there is no message return nothing
        if ( !message.value )
            return;

        //Setting parameters of the MessageSendevent and firing the event
        sendEvent.setParams( { "message" : message.value, "activeTab" : component.get( "v.activeTab" ) } );
        sendEvent.fire();
        message.value = "";
    }
})