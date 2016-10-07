package it.kirey.kfuture.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.kirey.kfuture.dao.IAmDictionaryHome;
import it.kirey.kfuture.entity.AmDictionary;
import it.kirey.kfuture.entity.AmResourceBundle;
import it.kirey.kfuture.service.IInternationalizationService;
import it.kirey.kfuture.util.AppConstants;
import it.kirey.kfuture.util.Translation;

@Service(value = IInternationalizationService.SERVICE_QUALIFIER)
public class InternationalizationServiceImpl implements IInternationalizationService {

	@Autowired
	private IAmDictionaryHome amDictionaryHome;
	
	@Autowired
	private Translation translation;

	@Transactional
	@Override
	public List<AmDictionary> getAllDictionary() {
		List<AmDictionary> dictionaryEntityList = amDictionaryHome.getAll();
		return dictionaryEntityList;
	}
	
	
	@Transactional
	@Override
	public Map<String, String> getFrontEndTranslations(String module) {
		List<AmDictionary> dictionaryDtolist = this.getAllDictionary();
	
		Map<String, String> map = new HashMap<String, String>();

		for (AmDictionary dictionaryDto : dictionaryDtolist) {
			String[] str = dictionaryDto.getGenericName().split("\\.");
			
			if (str[1].equals(AppConstants.FRONT_END) && str[2].equals(module)) {
				if (dictionaryDto.getAmResourceBundles().size() != 0) {
					boolean flag = false;
					for (AmResourceBundle resourceBundleDto : dictionaryDto.getAmResourceBundles()) {
						if (resourceBundleDto.getLanguage().equals(translation.getUsersDefaultLang())
								&& resourceBundleDto.getTranslation() != null) {
							map.put(dictionaryDto.getGenericName(), resourceBundleDto.getTranslation());
							flag = true;
						}
					}
					if(!flag) 
						map.put(dictionaryDto.getGenericName(), dictionaryDto.getDefaultTranslation());
					
				}else if(dictionaryDto.getDefaultTranslation() != null){
					map.put(dictionaryDto.getGenericName(), dictionaryDto.getDefaultTranslation());
				}

			}
		}
		return map;
	}

}
