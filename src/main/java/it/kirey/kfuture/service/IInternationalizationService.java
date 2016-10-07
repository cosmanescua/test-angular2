package it.kirey.kfuture.service;

import java.util.List;
import java.util.Map;

import it.kirey.kfuture.entity.AmDictionary;


public interface IInternationalizationService {
	public static final String SERVICE_QUALIFIER = "internationalizationService";
/*	public Map<String, String> getPropertyByLang(String lang);
	public void saveProperty(List<ResourceBundle> resourceBundle);*/

	public List<AmDictionary> getAllDictionary();

	public Map<String, String> getFrontEndTranslations(String module);
}
