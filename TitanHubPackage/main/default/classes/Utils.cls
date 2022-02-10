///////////////////////////////////////////////////////////////////////////////// 
// 
// Name: Utils
// Author: Alan Huang
// Created: 01/25/2022
// Updated: 01/25/2022
// Description: Utility class that facilitates use of more complex data
// 				structures in Apex
// 
/////////////////////////////////////////////////////////////////////////////////

public class Utils {
    // Combines two object/aggregate Lists
	public static List<Map<String, Object>> combineByIds(List<sObject> listA, List<sObject> listB) {
        List<Map<String, Object>> combinedMaps = new List<Map<String, Object>>();
        for (sObject a : listA) {
            Map<String, Object> combinedMap = new Map<String, Object>();
            Map<String, Object> mapA = a.getPopulatedFieldsAsMap();
            combinedMap.putAll(mapA);
            for (sObject b: listB) {
                if (b.Id == a.Id) {
                    Map<String, Object> mapB = b.getPopulatedFieldsAsMap();
                    combinedMap.putAll(mapB);
                    
                    break;
                }
            }
            combinedMaps.add(combinedMap);
        }
        return combinedMaps;
    }
    
    // Destructures child Lists and appends their objects to parent objects by a common field
    // Parent listA
    // Child listB
    public static List<Map<String, Object>> appendChildrenByFields(String fieldA, List<sObject> listA, String fieldB, List<sObject> listB) {
        List<Map<String, Object>> combinedMaps = new List<Map<String, Object>>();
        String listBType = listB.getSObjectType().getDescribe().getName();
        listBType = listBType.replace('__c', 's__r');
        for (sObject a : listA) {
            Map<String, Object> combinedMap = new Map<String, Object>();
            Map<String, Object> mapA = a.getPopulatedFieldsAsMap();
            combinedMap.putAll(mapA);
            List<Map<String, Object>> mapASublistB = new List<Map<String, Object>>();
            for (sObject b: listB) {
                if (b.get(fieldB) == a.get(fieldA)) {
                    Map<String, Object> mapB = b.getPopulatedFieldsAsMap();
                    mapASublistB.add(mapB);
                    
                }
            }
            combinedMap.put(listBtype, mapAsubListB);
            combinedMaps.add(combinedMap);
        }
        return combinedMaps;
    }
}