global class RemoveMultiselectBars {
    @InvocableMethod
	public static list<string> CheckValues(List<string> OneStringList) {
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