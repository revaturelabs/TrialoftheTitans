///////////////////////////////////////////////////////////////////////////////// 
// 
// Name: UtilsTest
// Author: Alan Huang
// Created: 01/25/2022
// Updated: 01/25/2022
// Description: Test class for Apex Utils
// 
/////////////////////////////////////////////////////////////////////////////////

@isTest
class UtilsTest {
	
    @isTest
    static void combineByIdsTest() {
        List<Contact> contactFirstNames = [SELECT FirstName FROM Contact];
        List<Contact> contactLastNames = [SELECT LastName FROM Contact];
        
        List<Map<String, Object>> contacts = Utils.combineByIds(contactFirstNames, contactLastNames);
        List<Map<String, Object>> soqlContacts = new List<Map<String, Object>>();
        
        for (sObject a : contactFirstNames) {
            Map<String, Object> combinedMap = new Map<String, Object>();
            Map<String, Object> mapA = a.getPopulatedFieldsAsMap();
            combinedMap.putAll(mapA);
            for (sObject b: contactLastNames) {
                if (b.Id == a.Id) {
                    Map<String, Object> mapB = b.getPopulatedFieldsAsMap();
                    combinedMap.putAll(mapB);
                    
                    break;
                }
            }
            soqlContacts.add(combinedMap);
        }
        
        System.assertEquals(contacts, soqlContacts);
    }
    
    @isTest
    static void appendChildrenByFieldsTest() {
        String fieldA = 'Id';
        String fieldB = 'AccountId';
        List<Account> accounts = [SELECT Name FROM Account];
        List<Contact> contacts = [SELECT Name, AccountId FROM Contact];
        
        List<Map<String, Object>> accountsAndContacts = Utils.appendChildrenByFields(fieldA, accounts, fieldB, contacts);
        List<Map<String, Object>> soqlAccountsAndContacts = new List<Map<String, Object>>();
         
        String listBType = contacts.getSObjectType().getDescribe().getName();
        listBType = listBType.replace('__c', 's__r');
        for (sObject a : accounts) {
            Map<String, Object> combinedMap = new Map<String, Object>();
            Map<String, Object> mapA = a.getPopulatedFieldsAsMap();
            combinedMap.putAll(mapA);
            List<Map<String, Object>> mapASublistB = new List<Map<String, Object>>();
            for (sObject b: contacts) {
                if (b.get(fieldB) == a.get(fieldA)) {
                    Map<String, Object> mapB = b.getPopulatedFieldsAsMap();
                    mapASublistB.add(mapB);
                    
                }
            }
            combinedMap.put(listBtype, mapAsubListB);
            soqlAccountsAndContacts.add(combinedMap);
        }
        System.assertEquals(accountsAndContacts, soqlAccountsAndContacts);
    }
    
    @testSetup
    public static void testSetup() {
        Account account = new Account(Name='Registrants');
        insert account;
        List<Contact> contacts = new List<Contact>{
        	new Contact(FirstName='John', LastName='Smith', AccountId=account.Id)
        };
		insert contacts;
    }
    
}