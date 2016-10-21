package it.kirey.kfuture.security.transfer;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import it.kirey.kfuture.entity.AmApplicationRoles;
import it.kirey.kfuture.entity.AmUrlRoutes;

public class UserTransfer {

	private final String username;

	private final Map<String, Boolean> roles;
	
	
	private final LinkedHashMap<String, String> companies;
	
	private final List<String> cssStyles;
	
	private final String defaultLanguage;
	
	private final List<AmUrlRoutes> userRoutes;
	
	
	public UserTransfer(String username, Map<String, Boolean> roles, LinkedHashMap<String, String> companies, List<String> cssStyles,
			String defaultLanguage, List<AmUrlRoutes> userRoutes) {
		this.username = username;
		this.roles = roles;
		this.companies = companies;
		this.cssStyles = cssStyles;
		this.defaultLanguage = defaultLanguage;
		this.userRoutes = userRoutes;
	}
	
	public String getUsername() {
		return this.username;
	}

	public Map<String, Boolean> getRoles() {
		return this.roles;
	}

	public LinkedHashMap<String, String> getCompanies() {
		return companies;
	}

	public List<String> getCssStyles() {
		return cssStyles;
	}

	public String getDefaultLanguage() {
		return defaultLanguage;
	}

	public List<AmUrlRoutes> getUserRoutes() {
		return userRoutes;
	}

	
}