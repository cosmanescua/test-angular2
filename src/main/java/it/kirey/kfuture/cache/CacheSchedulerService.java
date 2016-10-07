package it.kirey.kfuture.cache;

import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.kirey.kfuture.entity.AmDictionary;
import it.kirey.kfuture.service.IInternationalizationService;
import net.sf.ehcache.Cache;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Element;

/**
 * Service class with PostConstruc method for caching dictionary items on startup
 * @author karadzica
 *
 */
@Service(value="cacheSchedulerService")
public class CacheSchedulerService {

	@Autowired
	CacheManager cacheManager;

	@Autowired
	IInternationalizationService internationalizationService;

	@PostConstruct
	public void init() {
		update();
	}

	public List<AmDictionary> update() {
		List<AmDictionary> list = internationalizationService.getAllDictionary();
		
		for (AmDictionary dict : list) {
			Cache cache = cacheManager.getCache("dictionary");
			Element element = new Element(dict.getGenericName(), dict);
			cache.put(element);
		}
		return list;
	}
}
