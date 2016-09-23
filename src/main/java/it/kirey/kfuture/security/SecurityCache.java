package it.kirey.kfuture.security;

import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import it.kirey.kfuture.entity.User;

/**
 * SecurityCache class is designed to keep record of all users logged to the
 * system along with the corresponding tokens. Whenever a user logs in, the application
 * generates the token and sends it back to the client. Simultaneously, the token,
 * along with the User object, is stored in the HashMap of the SecurityCache
 * class. Whenever the new HTTP request is checked by
 * AuthenticationTokenProcessingFilter, the HashMap is searched for the arrived
 * token and, if found, the User object is used to get the user’s privileges and
 * to check if the token is timed out.
 * 
 * @author Vladimir
 *
 */
public class SecurityCache extends HashSet {

	private static Map<String, User> cache;
	private static final SecurityCache securityCache = new SecurityCache();
	private static int numberOfErasedItemsInCache = 0;

	private SecurityCache() {
		// Create cache as the synchronized HashMap
		cache = Collections.synchronizedMap(new HashMap<String, User>());
	}

	/**
	 * Create token based on the data from the User object
	 * 
	 * @param user
	 *            of type User
	 * @return token as the String
	 */
	public static String createToken(User user) {
		String token = TokenUtils.createToken(user);
		cache.put(token, user);
		return token;
	}

	/**
	 * The method returns the User if there is a valid AUTH-TOKEN stored in this
	 * class If the token sent as argument is not valid, this method will remove
	 * it from the cache, otherwise, the User will be returned.
	 * 
	 * @param authToken
	 *            as String
	 * @return User object the token of which has been validated.
	 */
	public static User validateUser(String authToken) {
		User user = null;
		Object o = cache.get(authToken);

		// Check if object from the cache is of User type
		if (User.class.isInstance(o)) {
			user = (User) o;
		}

		if (user == null)
			return null;

		// Validate the token
		if (!TokenUtils.validateToken(user, authToken)) {
			cache.remove(authToken);
			user = null;
		}
		return user;
	}

	/**
	 * Cache cleaning method. Each token with elapsed time will be removed from
	 * the cache when this method is executed. It implements the Runnable
	 * interface to be executed in the separate thread.
	 * 
	 * @author randjelovicv
	 *
	 */
	private static class BackgroundCacheClean implements Runnable {
		@Override
		public void run() {
			numberOfErasedItemsInCache = 0;
			Iterator iterator = cache.entrySet().iterator();
			while (iterator.hasNext()) {
				Map.Entry item = (Map.Entry) iterator.next();
				String authToken = (String) item.getKey();
				Object itemObject = item.getValue();
				User user = User.class.cast(itemObject);
				if (!TokenUtils.validateToken(user, authToken)) {
					iterator.remove();
					numberOfErasedItemsInCache++;
				}
			}
		}
	}

	/**
	 * Clears all token-user pairs for which token session time has elapsed
	 */
	public static void clearElapsedTokens() {
		Runnable backgroundCacheClean = new BackgroundCacheClean();
		Thread thread1 = new Thread(backgroundCacheClean);
		thread1.start();
		return;
	}

	public static int getNumberOfErasedItemsInCache() {
		return numberOfErasedItemsInCache;
	}

	public static int getNumberOfItemsInCache() {
		return cache.size();
	}

}
