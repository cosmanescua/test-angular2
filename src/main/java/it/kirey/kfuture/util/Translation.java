package it.kirey.kfuture.util;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

import it.kirey.kfuture.dao.IAmDictionaryHome;
import it.kirey.kfuture.entity.AmDictionary;
import it.kirey.kfuture.entity.AmResourceBundle;
import it.kirey.kfuture.entity.AmUserAccounts;
import it.kirey.kfuture.error.ErrorResource;
import it.kirey.kfuture.service.IInternationalizationService;

@Component(value = "translator")
public class Translation {
	
	/*@Autowired
	private IAmDictionaryHome amDictionaryHome;*/
	
	@Autowired
	IInternationalizationService internationalizationService;

	public String translate(String jsonStringInputObject)
	{
		String searchString = jsonStringInputObject;
		
		while(searchString.contains("njamb."))
		{
			int startIndex = jsonStringInputObject.indexOf("njamb.");
			int endIndex = jsonStringInputObject.substring(startIndex).indexOf("\"")+startIndex;
			String genericNameToReplace = jsonStringInputObject.substring(startIndex, endIndex);
			System.out.println(genericNameToReplace);
			String translation = findTranslationByGenericKey(genericNameToReplace, getUsersDefaultLang());
			jsonStringInputObject = jsonStringInputObject.replaceAll(genericNameToReplace, translation);
			searchString = jsonStringInputObject.substring(startIndex+translation.length());
		}
		
		return jsonStringInputObject;
	}
	
	public  String findTranslationByGenericKey(String genKey, String lang){
		List<AmDictionary> listDic =  internationalizationService.getAllDictionary();
		String translation = "";
		for (AmDictionary amDictionary : listDic) {
			
			if(amDictionary.getGenericName().equals(genKey)){
				translation = amDictionary.getDefaultTranslation();
				if(amDictionary.getAmResourceBundles().size() > 0){
					for (AmResourceBundle amBundle : amDictionary.getAmResourceBundles()) {
						if(amBundle.getLanguage().equals(lang)){
							translation = amBundle.getTranslation();
							break;
						}
					}
				}
				else return translation;
			}
		}
		return translation;
	}
	
	public String getUsersDefaultLang()
	{
		AmUserAccounts user = Utilities.getUserFromContext();
		
		if (user!=null)
			return user.getDefaultLanguage();
		else return "en";
	}
	
	public String translateErrorMessage(ErrorResource errorResponse){
		
		ObjectMapper mapper = new ObjectMapper();
		ObjectWriter ow = new ObjectMapper().writer();
		String translationString, translationOfError = null;
		
		try {
			translationString = ow.writeValueAsString(errorResponse);
			translationOfError = translate(translationString);	
			return translationOfError;
		} catch (JsonProcessingException e) {
			return null;
		}   
	}
	

}
