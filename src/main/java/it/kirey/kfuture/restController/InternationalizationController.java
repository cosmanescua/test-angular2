package it.kirey.kfuture.restController;


import java.util.HashMap;
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

import it.kirey.kfuture.dao.impl.AmDictionaryHome;
import it.kirey.kfuture.dao.impl.AmUserAccountsHome;
import it.kirey.kfuture.entity.AmDictionary;
import it.kirey.kfuture.entity.AmResourceBundle;
import it.kirey.kfuture.util.AppConstants;
import it.kirey.kfuture.util.Translation;
import net.sf.ehcache.Cache;
import net.sf.ehcache.CacheManager;


@RestController
@RequestMapping(value = "/rest")
public class InternationalizationController {
	
	@Autowired
	private AmDictionaryHome amDictionaryHome;
	
	@Autowired
	private AmUserAccountsHome amUserAccountsHome;
	
	@Autowired
	private Translation translation;
	
	@Autowired
	CacheManager cacheManager;

	/**
	 * Get static translations for specific module (page)
	 * @param moduleName
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/translations/{moduleName}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Map<String, String>> getFrontEndTranslation(@PathVariable(value = "moduleName") String moduleName) throws Exception{
		Map<String, String> map = new HashMap<String, String>();
		
		Cache cache = cacheManager.getCache("dictionary");
		cache.getKeys();
		cache.get("dicList");
		
		List<AmDictionary> dictionaryList = amDictionaryHome.findAll();
		
		//loop list of dictionary objects
		for (AmDictionary dict : dictionaryList) {
			String[] str = dict.getGenericName().split("\\.");
			boolean flag = false;
			
			//if generic name is for front end
			if (str[1].equals(AppConstants.FRONT_END) && str[2].equals(moduleName)) {
				
				//if specific translation exists
				if (dict.getAmResourceBundles().size() != 0) {
					flag = false;
					for (AmResourceBundle resourceBundleDto : dict.getAmResourceBundles()) {
						if (resourceBundleDto.getLanguage().equals(translation.getUsersDefaultLang())
								&& resourceBundleDto.getTranslation() != null) {
							map.put(dict.getGenericName(), resourceBundleDto.getTranslation());
							flag = true;
						}
					}					
				}
				
				if(!flag){
					if (dict.getDefaultTranslation() != null && dict.getDefaultTranslation() != "".trim()){
						map.put(dict.getGenericName(), dict.getDefaultTranslation());
					}else{
						map.put(dict.getGenericName(), dict.getGenericName());
					}
				}
			}
		}
		return new ResponseEntity<Map<String, String>>(map, HttpStatus.OK);
	}
	
	/**
	 * Change default language for user 
	 * @param langCode
	 * @return
	 */
	@RequestMapping(value = "/translations/language/{langCode}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> changeUserDefaultLanguage(
			@PathVariable(value = "langCode") String langCode) throws Exception{
		
		amUserAccountsHome.changeDefaultLanguage(langCode);
		 
		return new ResponseEntity<String>("OK", HttpStatus.OK);
	}
	
	
	@RequestMapping(value = "/{lang}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<AmDictionary>> getDictList(@PathVariable(value = "lang") String lang) throws Exception{
		
		List<AmDictionary> dictionaryList = amDictionaryHome.findAll();

		return new ResponseEntity<List<AmDictionary>>(dictionaryList, HttpStatus.OK);
	}
	
}
