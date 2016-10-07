package it.kirey.kfuture.restController;


import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import it.kirey.kfuture.entity.AmDictionary;
import it.kirey.kfuture.service.IInternationalizationService;
import it.kirey.kfuture.service.IUserService;
import it.kirey.kfuture.util.AppConstants;


@RestController
@RequestMapping(value = "/rest")
public class InternationalizationController {
	
	@Autowired
	private IInternationalizationService internationalizationService;
	
	@Autowired
	private IUserService userService;

	/**
	 * Get static translations for specific module (page)
	 * @param moduleName
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/translations/{moduleName}/{langCode}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Map<String, String>> getFrontEndTranslation(
			@PathVariable(value = "moduleName") String moduleName, @PathVariable(value = "langCode") String langCode) throws Exception{
		
		if(moduleName.equals(AppConstants.NAVIGATION_MODULE)){
			userService.changeDefaultLanguage(langCode);
		}
		
		Map<String, String> mapFrontEndTranslations = internationalizationService.getFrontEndTranslations(moduleName); 
		
		return new ResponseEntity<Map<String, String>>(mapFrontEndTranslations, HttpStatus.OK);
	}
	
	/**
	 * Change default language for user 
	 * @param langCode
	 * @return
	 */
	
	/*@RequestMapping(value = "/translations/language/{langCode}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> changeUserDefaultLanguage(
			@PathVariable(value = "langCode") String langCode) throws Exception{
		
		userService.changeDefaultLanguage(langCode);
		 
		return new ResponseEntity<String>("OK", HttpStatus.OK);
	}*/
	
	@RequestMapping(value = "/{lang}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<AmDictionary>> getDictList(@PathVariable(value = "lang") String lang) throws Exception{
		
		List<AmDictionary> dictList = internationalizationService.getAllDictionary();
		
		return new ResponseEntity<List<AmDictionary>>(dictList, HttpStatus.OK);
	}
	
}
