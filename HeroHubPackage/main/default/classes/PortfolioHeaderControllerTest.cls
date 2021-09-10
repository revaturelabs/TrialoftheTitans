@isTest
public class PortfolioHeaderControllerTest {
      
    PortfolioHeaderControllerTest() {
        
    }
    
    @isTest
    public static void controllerTest(){
        String output = PortfolioHeaderController.getUserName();
        System.assertNotEquals(null, output);
    }
}