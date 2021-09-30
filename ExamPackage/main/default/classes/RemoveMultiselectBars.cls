global class RemoveMultiselectBars {
    
    
    //Removes the Bars that where added at the end of the mulitselect Process
    
    @InvocableMethod
	public static list<string> RemoveBars(List<string> OneStringList) {
        if(!(OneStringList.isEmpty())){
            string tempStr = OneStringList[0];
            tempStr = tempStr.removeEnd('||');
            List<String> finalList = new List<String>();
            finalList.add(tempStr);
            return finalList;
        }        
        else return null;
    }
        
}