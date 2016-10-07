package it.kirey.kfuture.restController;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.codec.Hex;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import it.kirey.kfuture.entity.AmCompanies;
import it.kirey.kfuture.entity.AmUserAccounts;
import it.kirey.kfuture.security.TokenUtils;
import it.kirey.kfuture.security.transfer.TokenTransfer;
import it.kirey.kfuture.security.transfer.UserLogin;
import it.kirey.kfuture.security.transfer.UserTransfer;
import it.kirey.kfuture.service.IUserService;

@RestController
@RequestMapping("/rest")
public class UserProfileController {

	@Autowired
	@Qualifier("authenticationManager")
	private AuthenticationManager authManager;

	@Autowired
	private IUserService userService;

	final static Logger logger = Logger.getLogger(UserProfileController.class);

	@RequestMapping(value = "/user")
	public ResponseEntity<UserTransfer> getUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Object principal = authentication.getPrincipal();
		UserDetails userDetails = (UserDetails) principal;
		AmUserAccounts userAccount = (AmUserAccounts) principal;
		LinkedHashMap<String, String> companyDetails = this.getCompanyDetails(userDetails);
		List<String> cssStyles = new ArrayList<String>(); 
		String cssFolder = "css/";
		String cssExtension = "_css.css";
		for (Map.Entry<String, String> entry : companyDetails.entrySet()) {
			cssStyles.add(cssFolder + entry.getKey() + cssExtension);
		}
		
		UserTransfer userTransfer = new UserTransfer(userDetails.getUsername(), this.createRoleMap(userDetails),
				companyDetails,cssStyles, userAccount.getDefaultLanguage());
		return new ResponseEntity<UserTransfer> (userTransfer, HttpStatus.OK);
	}

	
	/**
	 * Performs the authentication of the user and generation of the Auth token.
	 * When generating the auth token, this method can use either Database approach in which case
	 * token is stored in User_Accounts table and retreived during each authentication. Having in mind that 
	 * frequent authentication requires frequent access to database, Spring cache is used to speed up 
	 * the process. In case the SecurityCache is applied, then token, along with User object, is kept
	 * in the SecurityCache class. 
	 * 
	 * @param login of type UserLogin contains the username and password of the user.
	 * @return Authentication token is sent to the client as object of type TokenTransfer
	 */
	@RequestMapping(value = "/user/authenticate", method = RequestMethod.POST, consumes = {
			MediaType.APPLICATION_JSON_VALUE }, produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<TokenTransfer> authenticate(@RequestBody UserLogin login) {
		
		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
				login.getUsername(), md5convert(login.getPassword()));

		Authentication authentication = this.authManager.authenticate(authenticationToken);
		SecurityContextHolder.getContext().setAuthentication(authentication);

		AmUserAccounts user = userService.getUserByUsername(login.getUsername());
		
		// -------------------------- Database token approach
		String token = TokenUtils.createToken(user);
		
		// -------------------------- SecurityCache approach		
//		String token = SecurityCache.createToken(user);
		
		user.setToken(token);
		user.setTimestamp(System.currentTimeMillis());
		userService.saveOrUpdate(user);
		
		TokenTransfer tokenTransfer = new TokenTransfer(token);
		return new ResponseEntity<TokenTransfer>(tokenTransfer, HttpStatus.OK);
	}
	
	private Map<String, Boolean> createRoleMap(UserDetails userDetails) {
		Map<String, Boolean> roles = new HashMap<String, Boolean>();
		for (GrantedAuthority authority : userDetails.getAuthorities()) {
			roles.put(authority.getAuthority(), Boolean.TRUE);
		}
		return roles;
	}
	
	private LinkedHashMap<String, String> getCompanyDetails(UserDetails userDetails){
		LinkedHashMap<String, String> companies = new LinkedHashMap<String, String>();

		 List<AmCompanies> companiesList = ((AmUserAccounts)userDetails).getAmCompanieses();
		 for (AmCompanies s : companiesList) {

			 companies.put(s.getCode(), s.getDescription());
			}
		 
		return companies;
	}
	
	/**
	 * Convert the password of type String into a digested MD5 string which is returned to the caller.
	 * @param password of type String
	 * @return md5 digest of password 
	 */
	public static String md5convert(String password) {
		MessageDigest digest;
		try {
			digest = MessageDigest.getInstance("MD5");
		} catch (NoSuchAlgorithmException e) {
			throw new IllegalStateException("No MD5 algorithm available!");
		}
		return new String(Hex.encode(digest.digest(password.toString().getBytes())));
	}
}