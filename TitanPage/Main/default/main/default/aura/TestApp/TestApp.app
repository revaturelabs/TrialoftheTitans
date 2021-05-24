<aura:application extends="force:slds">
    
    <!-- <aura:attribute name="" type=""/>  -->
    
    <lightning:button label="Titan 1" onclick="{!cTitanMethod}"/>
    
    <c:TitansPageLanding/>
    <div class="slds-grid slds-gutters">
    <div class="slds-col slds-size_6-of-12">
    <c:ExamsLanding/>
	<c:LandingSkills/>
    </div>

    <div class="slds-col slds-size_6-of-12">

    </div>
    </div>
</aura:application>