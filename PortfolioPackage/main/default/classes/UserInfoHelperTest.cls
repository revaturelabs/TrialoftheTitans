/** 
 * Created by Sean Whitley 3/20/22
 * cookie-crisp#3847
 * sean.whitley@revature.net
 */

@isTest
public class UserInfoHelperTest {
    
    @isTest
    static void getBasicUserInfoTest() {
        String name = 'Test';

        User user = new User();
        Contact c = new Contact(name);
        user.Name = name;
        user.FullPhotoUrl = name;

        insert c;
        insert user;
        User hero = UserInfoHelper.getBasicUserInfo();

        System.assertEquals(name, hero.Name, 'No name found');
        System.assertEquals(name, hero.Contact.Title, 'No Title found');
        System.assertEquals(name, hero.FullPhotoUrl, 'No photo url found');
    }
}
