package securityWithCSRF;

import static org.junit.Assert.assertEquals;

import java.io.IOException;

import org.jsoup.Connection;
import org.jsoup.Connection.Method;
import org.jsoup.Jsoup;
import org.junit.BeforeClass;
import org.junit.Test;

public class TestRestJsoup {

	
	private static Connection con1;
//	private static String xsrf;
	private static String auth;

	@BeforeClass
	public static void getTokens() {		
		con1 = Jsoup.connect("http://localhost:8091/KFutureDemo/");
		con1.timeout(15000);
		try {
			//Get XSRF-TOKEN
			/*
			Connection.Response res = con1
					.userAgent("Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36")
					.header("Content-Type", "application/json")
					.method(Method.GET)
					.execute();

			Map<String, String> mapCookies = res.cookies();
 		    xsrf = res.cookie("XSRF-TOKEN");
			
			System.out.println("XSRF-TOKEN");
			System.out.println(xsrf + " \n");
*/
						
			//Get X-Auth-Token
			String json = "{\"username\":" + "\"root\"" + ", " + "\"password\":" + "\"root\"" + "}";
			
			Connection.Response res1 = con1.url("http://localhost:8091/KFutureDemo/rest/user/authenticate")
//					.cookies(mapCookies)
					.header("Content-Type", "application/json")
//					.header("X-XSRF-TOKEN", res.cookie("XSRF-TOKEN"))
					.data("username", "root")
					.data("password", "root")
					.ignoreContentType(true)
					.requestBody(json)
					.method(Method.POST)
					.execute();

			System.out.println("X-Auth-Token");
			
			String[] results = res1.body().split(":" + "\"");
			String result1 = results[0];
			String result2 = results[1];
			result2 = result2.replace("\"}", "");
			System.out.println(result2 + " \n");
			auth = result2;

		} catch (IOException e) {
			e.printStackTrace();
		}

	}

	
	
	@Test
	public void test() {
		Connection.Response res2 = null;

		try {
			//test TestSecurityController Method.POST
			res2 = con1.url("http://localhost:8091/KFutureDemo/rest/security/test")
//					.header("X-XSRF-TOKEN", xsrf)
					.header("X-Auth-Token", auth)
					.header("Content-Type", "application/json")
					.data("id", "1")
					.method(Method.POST)
					.execute();

		} catch (IOException e) {
			e.printStackTrace();
		}
		
		System.out.println("Response for url: /rest/security/test");
		System.out.println("Status code: " + res2.statusCode() + "\nStatus message: " + res2.statusMessage());
		System.out.println("Metod: " + res2.method());
		System.out.println(res2.body().toString() + " \n");
		
		assertEquals(res2.statusCode(), 201);		
		assertEquals(res2.statusMessage(), "Created");		
		assertEquals("POST method completed", res2.body());
	}

	
	@Test
	public void test2(){
		Connection.Response res3 = null;
		
		try {
			//test TestSecurityController Method.PUT
			res3 = con1.url("http://localhost:8091/KFutureDemo/rest/security/test")
//					.header("X-XSRF-TOKEN", xsrf)
					.header("X-Auth-Token", auth)
					.data("id", "2")
					.method(Method.PUT)
					.execute();
			
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		System.out.println("Response for url: /rest/security/test");
		System.out.println("Status code: " + res3.statusCode() + "\nStatus message: " + res3.statusMessage());
		System.out.println("Metod: " + res3.method());
		System.out.println(res3.body().toString() + " \n");
		
		//assertEquals("PUT method completed", res3.body());
		assertEquals(200, res3.statusCode());

	}


	
	@Test
	public void test3(){
		
		Connection.Response res4 = null;
		try {
			//test TestSecurityController Method.GET
			con1 = Jsoup.connect("http://localhost:8091/KFutureDemo/rest/security/test");
			res4 = con1
//					.header("X-XSRF-TOKEN", xsrf)
					.header("X-Auth-Token", auth)
					.method(Method.GET)
					.execute();
		
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		System.out.println("Response for url: /rest/security/test");
		System.out.println("Status code: " + res4.statusCode() + "\nStatus message: " + res4.statusMessage());
		System.out.println("Metod: " + res4.method());
		System.out.println(res4.body().toString() + " \n");
		
		
		assertEquals(res4.statusCode(), 200);			
		assertEquals(res4.statusMessage(), "OK");
		assertEquals("GET method completed", res4.body());
	}
	
	
	@Test
	public void test4(){
		Connection.Response res5 = null;
		try {
			//testTestSecurityController Method.GET
			con1 = Jsoup.connect("http://localhost:8091/KFutureDemo/rest/security/test/clearCache");
			res5 = con1
//					.header("X-XSRF-TOKEN", xsrf)
					.header("X-Auth-Token", auth)
					.method(Method.GET)
					.execute();
	
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		System.out.println("Response for url: /rest/security/test/clearCache");
		System.out.println("Status code: " + res5.statusCode() + "\nStatus message: " + res5.statusMessage());
		System.out.println("Metod: " + res5.method());
		System.out.println(res5.body().toString() + " \n");
		
		
		assertEquals(res5.statusCode(), 200);			
		assertEquals(res5.statusMessage(), "OK");
		//assertEquals("Cache cleared0", res4.body());
	}
	
	
	/*
	//testTestSecurityController Method.DELETE - not work

	@Test
	public void test5(){
	Connection.Response res6 = null;
		try {
			con1 = Jsoup.connect("http://localhost:8091/KFutureDemo/rest/security/test/1");

			res6 = con1
					.header("X-XSRF-TOKEN", xsrf)
					.header("X-Auth-Token", auth)
					.header("Content-Type", "application/json")
					.userAgent("Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36")
					.method(Method.DELETE)
					.execute();
	
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		System.out.println("Response for url: /rest/security/test/1");
			System.out.println("Status code: " + res6.statusCode() + "\nStatus message: " + res6.statusMessage());
			System.out.println("Metod: " + res6.method());
			System.out.println(res6.body().toString() + " \n");
			
			
			assertEquals(res6.statusCode(), 204);			
			assertEquals(res6.statusMessage(), "No Content");
			//assertEquals("", res4.body());
	}
*/

}
