package it.kirey.kfuture.service;

import java.util.List;
import java.util.Map;
import it.kirey.kfuture.entity.ResourceBundle;

public interface IInternationalizationService {
	public static final String SPRING_QUALIFIER = "internationalizationService";
	public Map<String, String> getPropertyByLang(String lang);
	public void saveProperty(List<ResourceBundle> resourceBundle);
}
