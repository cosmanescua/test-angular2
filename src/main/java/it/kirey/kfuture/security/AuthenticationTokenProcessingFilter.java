package it.kirey.kfuture.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Level;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.GenericFilterBean;

import it.kirey.kfuture.dao.IAmUserAccountsHome;
import it.kirey.kfuture.entity.AmUserAccounts;
import it.kirey.kfuture.service.IUserService;

/**
 * The class is used as a Spring security filter bean. It is inserted into the Spring security chain of filters.
 * Its method doFilter() is used to validate the received AUTH-TOKEN. In case of positive validation,
 * UserDetails are inserted into the Spring security context.
 * @author Vladimir
 *
 */
public class AuthenticationTokenProcessingFilter extends GenericFilterBean {

	@Autowired
	private IUserService userService;
	
	private static final Logger LOGGER = Logger.getLogger(AuthenticationTokenProcessingFilter.class.getName());

	/**
	 * Spring security filter method used to validate the X-AUTH-TOKEN 
	 */
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		long beginTime2 = System.nanoTime();
		HttpServletRequest httpRequest = this.getAsHttpRequest(request);
		String authToken = this.extractAuthTokenFromRequest(httpRequest);
		AmUserAccounts user = null;
		boolean validationResult = false;

		if (authToken != null) {
			long beginTime1 = System.nanoTime();
			
			// -------------------------------- Database token approach			
			user = userService.getUserByToken(authToken);
			LOGGER.log( Level.INFO, "userService.getUserByToken(authToken): " + (System.nanoTime()-beginTime1) + "ns");
			validationResult = TokenUtils.validateToken(user, authToken);
			LOGGER.log( Level.INFO, "Token validation time: " + (System.nanoTime()-beginTime1) + "ns");
			
			// -------------------------------- SecurityCache approach
			// user = SecurityCache.validateUser(authToken);
			// validationResult = (user != null);
			//----------------------------------------------------------
			
			if (validationResult) {
				UserDetails userDetails = (UserDetails) user;
				UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
						userDetails, null, userDetails.getAuthorities());
				authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpRequest));
				SecurityContextHolder.getContext().setAuthentication(authentication);
			}
		}
		LOGGER.log( Level.INFO, "Authentication Token Filter execution time: " + (System.nanoTime()-beginTime2) + "ns");
		chain.doFilter(request, response);
	}

	/**
	 * Convert the ServletRequest into HttpServletRequest
	 * @param request of type ServletRequest
	 * @return HttpServletRequest
	 */
	private HttpServletRequest getAsHttpRequest(ServletRequest request) {
		if (!(request instanceof HttpServletRequest)) {
			throw new RuntimeException("Expecting an HTTP request");
		}
		return (HttpServletRequest) request;
	}

	/**
	 * Extract X-AUTH-TOKEN from the HTTP request
	 * @param httpRequest of type HttpServletRequest
	 * @return X-AUTH-TOKEN of String type
	 */
	private String extractAuthTokenFromRequest(HttpServletRequest httpRequest) {
		/* Get token from header */
		String authToken = httpRequest.getHeader("X-Auth-Token");

		/* If token not found get it from request parameter */
		if (authToken == null) {
			authToken = httpRequest.getParameter("token");
		}
		return authToken;
	}
}