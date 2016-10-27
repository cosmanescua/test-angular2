package it.kirey.kfuture.cache;

import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.interceptor.SimpleKey;
import org.springframework.stereotype.Service;

import it.kirey.kfuture.dao.impl.AmDictionaryHome;
import it.kirey.kfuture.entity.AmDictionary;
import net.sf.ehcache.Cache;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Element;

/**
 * Service class with PostConstruc method for caching dictionary items on startup
 * @author karadzica
 *
 */
@Service(value="dictionaryCacheStartUpLoader")
public class DictionaryCacheStartUpLoader {

	@Autowired
	CacheManager cacheManager;
	
	@Autowired
	AmDictionaryHome amDictionaryHome; 
	
	@PostConstruct
	public void init() {
		update();
	}

	public void update() {
		List<AmDictionary> list = amDictionaryHome.findAll();
		Cache cache = cacheManager.getCache("dictionary");
		Element element = new Element(SimpleKey.EMPTY,list);
		cache.put(element);
	}
}
