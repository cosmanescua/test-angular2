package it.kirey.kfuture.util;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

import it.kirey.kfuture.dao.impl.AmDictionaryHome;
import it.kirey.kfuture.dto.ValidationErrorDto;
import it.kirey.kfuture.entity.AmDictionary;
import it.kirey.kfuture.entity.AmResourceBundle;
import it.kirey.kfuture.entity.AmUserAccounts;
import it.kirey.kfuture.error.ErrorResource;

@Component(value = "translator")
public class Translation {

	@Autowired
	AmDictionaryHome amDictionaryHome;

	public String translate(String jsonStringInputObject) {
		String searchString = jsonStringInputObject;

		int lastIndex = 0;
		int count = 0;

		while (lastIndex != -1) {
			lastIndex = jsonStringInputObject.indexOf(AppConstants.GENERIC_NAME_KEY, lastIndex);
			if (lastIndex != -1) {
				count++;
				lastIndex += AppConstants.GENERIC_NAME_KEY.length();
			}
		}

		while (count > 0) {
			int startIndex = searchString.indexOf(AppConstants.GENERIC_NAME_KEY);
			int endIndex = searchString.substring(startIndex).indexOf("\"") + startIndex;
			String genericNameToReplace = searchString.substring(startIndex, endIndex);
			System.out.println(genericNameToReplace);
			String translation = findTranslationByGenericKey(genericNameToReplace, getUsersDefaultLang());
			searchString = searchString.substring(startIndex + translation.length());

			jsonStringInputObject = jsonStringInputObject.replaceFirst(genericNameToReplace, translation);

			count--;
		}

		return jsonStringInputObject;
	}

	public String findTranslationByGenericKey(String genKey, String lang) {
		List<AmDictionary> listDic = amDictionaryHome.findAll();
		String translation = "";
		//loop list of dictionary
		boolean foundInDictionary = false;
		for (AmDictionary amDictionary : listDic) {
			//find generic name
			boolean flag = false;
			if (amDictionary.getGenericName().equals(genKey)) {
				foundInDictionary = true;
				
				//if resource bundle exists
				if (amDictionary.getAmResourceBundles().size() > 0) {
					for (AmResourceBundle amBundle : amDictionary.getAmResourceBundles()) {
						
						//if bundle on wanted language exist
						if (amBundle.getLanguage().equals(lang)) {
							translation = amBundle.getTranslation();
							flag = true;
						}
					}
				
				}
			
			//not found wanted language, use default if exists
			if (!flag) {
					if (amDictionary.getDefaultTranslation() != null && amDictionary.getDefaultTranslation() != "".trim()) {
						translation = amDictionary.getDefaultTranslation();
					//if default translation dont exist, return generic name
					}else{
						translation = amDictionary.getGenericName();
					}
				}
			
			break;
			}
		}
		//generic key name not found in dictionary list
		if(!foundInDictionary){
			translation = genKey;
		}
		return translation;
	}

	public String getUsersDefaultLang() {
		AmUserAccounts user = Utilities.getUserFromContext();

		if (user != null)
			return user.getDefaultLanguage();
		return null;
	}

	public String translateErrorMessage(ErrorResource errorResponse) {

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

	public String translateErrorMessage(ValidationErrorDto validationError) {

		ObjectMapper mapper = new ObjectMapper();
		ObjectWriter ow = new ObjectMapper().writer();
		String translationString, translationOfError = null;

		try {
			translationString = ow.writeValueAsString(validationError);
			translationOfError = translate(translationString);
			return translationOfError;
		} catch (JsonProcessingException e) {
			return null;
		}
	}

}
