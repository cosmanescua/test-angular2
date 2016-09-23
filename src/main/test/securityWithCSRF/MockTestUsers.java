package securityWithCSRF;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;

import it.kirey.kfuture.dao.UserDao;
import it.kirey.kfuture.entity.User;
import it.kirey.kfuture.service.impl.UserServiceImpl;

@RunWith(MockitoJUnitRunner.class)
public class MockTestUsers {

	@Mock
	public UserDao userDao;

	@InjectMocks
	public UserServiceImpl userService = new UserServiceImpl();
	
	
	@Test
	public void test() {
		User user1 = new User(1, "vlada", "vlada", "vlada@gmail.com");

		Mockito.when(userDao.getUserByUsername("vlada")).thenReturn(user1);

		User retrivedUser = userService.getUserByUsername("vlada");

		assertEquals(user1, retrivedUser);

	}
	
	@Test
	public void test2(){
		User user = new User();
		user.setUsername("vlada");
		user.setPassword("vlada");
		user.setEmail("vlada@gmail.com");
		user.setToken("352b0348ca067faa9bcc595ad65045dc");
		
		when(userDao.getUserByToken("352b0348ca067faa9bcc595ad65045dc")).thenReturn(user);
		
		User actualUser = userService.getUserByToken("352b0348ca067faa9bcc595ad65045dc");
		
		assertEquals(user, actualUser);
		
	}


}
