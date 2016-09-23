package securityWithCSRF;

import static org.junit.Assert.assertEquals;

import java.text.ParseException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.transaction.annotation.Transactional;

import it.kirey.kfuture.dao.UserDao;
import it.kirey.kfuture.entity.User;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({ "classpath:/META-INF/config/kFutureDemo-context-persistence.xml", "classpath:/META-INF/config/kFutureDemo-context.xml", "classpath:/META-INF/config/Spring-MailIntegration.xml"})
@Transactional
@WebAppConfiguration
public class SpringTestUsers {

	@Autowired
	private UserDao UserDao;

	@Test
	@Transactional
	public void test() throws ParseException {

		
		User user = UserDao.getUserByUsername("vlada");
		
		User actualUser = new User();
		actualUser.setId(4);
		actualUser.setUsername("vlada");
		actualUser.setPassword("de83521973ca6a8a2ed28d590fc28074");
		
		System.out.println(actualUser);
		System.out.println(user);

		int id = user.getId();
		assertEquals(4, id);
		
		String name = user.getUsername();
		
		assertEquals("vlada", name);


	}

}
