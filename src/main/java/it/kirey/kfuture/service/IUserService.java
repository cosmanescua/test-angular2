package it.kirey.kfuture.service;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetailsService;

import it.kirey.kfuture.entity.AmUrlRoutes;
import it.kirey.kfuture.entity.AmUserAccounts;

public interface IUserService extends UserDetailsService {
	public static final String SERVICE_QUALIFIER = "userService";
	public void saveOrUpdate(AmUserAccounts newUser);
	public AmUserAccounts getById(Integer id);
//	public void insertWithKeyHolder(User newUser);
	public AmUserAccounts getUserByUsername(String username);
	public AmUserAccounts getUserByToken(String token);
	public void changeDefaultLanguage(String langCode);
	public void logoutUser();
	public List<AmUrlRoutes> findRoutesByUser();
}
