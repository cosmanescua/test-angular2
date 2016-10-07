package securityTesting;

import static org.junit.Assert.*;

import java.io.IOException;
import java.net.URL;
import java.util.Map;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.Connection.Method;
import org.junit.Assert;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import junit.framework.TestCase;

public class TestRest {

	private static Connection con1; //= Jsoup.connect("http://localhost:8091/KFutureDemo/");
	private static String xsrf;
	private static String auth;

	@BeforeClass
	public static void getTokens() {		
		con1 = Jsoup.connect("http://localhost:8091/KFutureDemo/");
		con1.timeout(5000);
		try {
			//Get XSRF-TOKEN
			Connection.Response res = con1
					.userAgent("Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36")
					.header("Content-Type", "application/json")
					.method(Method.GET)
					.execute();

			Map<String, String> mapCookies = res.cookies();

			String json = "{\"username\":" + "\"root\"" + ", " + "\"password\":" + "\"root\"" + "}";

			xsrf = res.cookie("XSRF-TOKEN");
			
			System.out.println("XSRF-TOKEN");
			System.out.println(xsrf + " \n");

			
			//Get X-Auth-Token
			Connection.Response res1 = con1.url("http://localhost:8091/KFutureDemo/rest/user/authenticate")
					.cookies(mapCookies)
					.header("Content-Type", "application/json")
					.header("X-XSRF-TOKEN", res.cookie("XSRF-TOKEN"))
					.data("username", "root")
					.data("password", "root")
					// .ignoreHttpErrors(true)
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

		try {
			//test rest controller Method.POST
			Connection.Response res2 = con1.url("http://localhost:8091/KFutureDemo/rest/testObject")
					.header("X-XSRF-TOKEN", xsrf)
					.header("X-Auth-Token", auth)
					.data("id", "1")
					.method(Method.POST)
					.execute();

			System.out.println("Response for url: /rest/testObject");

			System.out.println(res2.body().toString() + " \n");

			
			assertEquals("New object created", res2.body());

		} catch (IOException e) {
			e.printStackTrace();
		} 
	}
	
	
	@Test
	public void test2(){
		
		try {
			//test rest controller Method.PUT
			Connection.Response res3 = con1.url("http://localhost:8091/KFutureDemo/rest/testObject")
					.header("X-XSRF-TOKEN", xsrf)
					.header("X-Auth-Token", auth)
					.data("id", "2")
					.method(Method.PUT)
					.execute();
			

			System.out.println("Response for url: /rest/testObject");

			System.out.println(res3.body().toString() + " \n");

			
			assertEquals("Object updated: TestObject [testId=0]", res3.body());
			
		} catch (IOException e) {
			e.printStackTrace();
		}

	}
	
	@Test
	public void test3(){
		try {
			//test rest controller Method.GET
			//Connection con2 = Jsoup.connect("http://localhost:8091/KFutureDemo/rest/security/test");
			con1 = Jsoup.connect("http://localhost:8091/KFutureDemo/rest/security/test");
			Connection.Response res4 = con1
					.header("X-XSRF-TOKEN", xsrf)
					.header("X-Auth-Token", auth)
					.method(Method.GET)
					.execute();
			

			System.out.println("Response for url: /demo/testObjects");

			System.out.println(res4.body().toString() + " \n");

			
			assertEquals("GET method completed", res4.body());
			
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	

}
