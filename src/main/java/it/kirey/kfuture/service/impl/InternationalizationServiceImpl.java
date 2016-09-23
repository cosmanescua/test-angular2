package it.kirey.kfuture.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.kirey.kfuture.dao.IResourceDao;
import it.kirey.kfuture.entity.ResourceBundle;
import it.kirey.kfuture.service.IInternationalizationService;

@Service(value=IInternationalizationService.SPRING_QUALIFIER)
public class InternationalizationServiceImpl implements IInternationalizationService {
	
	@Autowired
	private IResourceDao resourceDao;
	
	@Transactional
	@Override
	public Map<String, String> getPropertyByLang(String langCode) {
		List<ResourceBundle> rb = resourceDao.getResourceByLang(langCode);
        Map<String, String> langPropertyMap = new HashMap<String, String>();
		if(rb.size() != 0){
			for (ResourceBundle resourceBundle : rb) {
				langPropertyMap.put(resourceBundle.getCategory() + "_" + resourceBundle.getKey(), resourceBundle.getValue());
			}
		}
		return langPropertyMap;
	}

	@Transactional
	@Override
	public void saveProperty(List<ResourceBundle> property) {
		for (ResourceBundle item : property) {
			resourceDao.saveResource((ResourceBundle)item);
		}
	}

}
