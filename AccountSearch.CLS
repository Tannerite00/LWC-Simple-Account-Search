public with sharing class AccountSearchController {

    @AuraEnabled
    public static List<Account> searchAccounts(String searchTerm){
        try {
            List<Account> acctList = new List<Account>();
            
            acctList = [SELECT Id, Name, Type FROM Account WHERE Name LIKE :searchTerm + '%'];
            return acctList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
}
}
