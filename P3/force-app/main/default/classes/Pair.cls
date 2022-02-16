////////////////
//// Class used for mapping data retrieved into the right format for charts
///////////////
    public class Pair{
        @AuraEnabled public String name;
        @AuraEnabled public Decimal value;
        public Pair(String name, Decimal value){
            this.name = name;
            this.value = value;
        }
    }