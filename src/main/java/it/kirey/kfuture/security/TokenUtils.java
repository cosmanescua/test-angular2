package it.kirey.kfuture.security;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import org.springframework.security.crypto.codec.Hex;

import it.kirey.kfuture.entity.Role;
import it.kirey.kfuture.entity.User;

/**
 * The class has a number of static methods used as token utilities
 * @author randjelovicv
 *
 */
public class TokenUtils {
	
	/**
	 * Create token as a String based on data from User object 
	 * @param user is object of User entity
	 * @return token as a String
	 */
	public static String createToken(User user) {
		long currnetTime = System.currentTimeMillis();
		
		StringBuilder signatureBuilder = new StringBuilder();
		signatureBuilder.append(user.getId());
		signatureBuilder.append(currnetTime);

		MessageDigest digest;
		try {
			digest = MessageDigest.getInstance("MD5");
		} catch (NoSuchAlgorithmException e) {
			throw new IllegalStateException("No MD5 algorithm available!");
		}

		String token = new String(Hex.encode(digest.digest(signatureBuilder.toString().getBytes())));
		return token;
	}
	

	/**
	 * Validate if the token supplied as authToken argument is valid. The token is valid if
	 * it is equal to the token stored in the User object and if its session has not expired. 
	 * 
	 * @param user
	 * @param authToken
	 * @return
	 */
	public static boolean validateToken(User user, String authToken) {
		boolean validationResult=false;
		long currnetTime = System.currentTimeMillis();
		long tokenIssuedTime = 0;
		if (user != null) tokenIssuedTime = user.getTimeStamp();
		long calculatedSessonTime =  currnetTime - tokenIssuedTime;
		
		if (user != null && user.getToken().equals(authToken) && (calculatedSessonTime<maxSessionDuration(user)) && (calculatedSessonTime>0)){
			validationResult=true;
		}
		
		return validationResult;
	}
	
	/**
	 * The method calculates the max session duration in the following way:
	 * 		- if user has a timeout defined, then this time is used as the session duration
	 * 		- if user does not have a timeout defined, then session duration is taken as timeout filed from the role with the longest timeout defined. 
	 * @param user
	 * @return
	 */
	public static long maxSessionDuration(User user){
		if(user.getTimeout() != null && user.getTimeout()>0){
			return user.getTimeout();
		}
		
	    long sessionDuration=0;
		for(Role role : user.getRoles()){
			if(role.getTimeout() != null && role.getTimeout()>sessionDuration) sessionDuration=role.getTimeout();
		}
		return sessionDuration;
	}
}