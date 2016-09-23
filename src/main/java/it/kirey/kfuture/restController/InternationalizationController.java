package it.kirey.kfuture.restController;


import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import it.kirey.kfuture.dto.ResourceBundleDto;
import it.kirey.kfuture.exception.ControllerException;
import it.kirey.kfuture.service.IInternationalizationService;


@RestController
@RequestMapping(value = "/lang")
public class InternationalizationController {
	
	@Autowired
	private IInternationalizationService internationalizationService;

	
	/**
	 * Get properties by language code
	 * @param lang - it_IT/en_EN
	 * @return
	 */
	@RequestMapping(value = "/{lang}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Map<String, String>> getProperties(@PathVariable(value = "lang") String lang) {
		
		Map<String, String> langProperty = internationalizationService.getPropertyByLang(lang);

		return new ResponseEntity<Map<String, String>>(langProperty, HttpStatus.OK);
	}
	
	
	/**
	 * Insert new resource bundle
	 * @param propertyList
	 * @param result
	 * @return
	 */
	@RequestMapping(value = "/property",
					method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> saveProperty(@RequestBody @Valid ResourceBundleDto propertyList, BindingResult result) {
		
		try {
			if(result.hasErrors()){
				
				return new ResponseEntity<Object>(result.getFieldError().toString(), HttpStatus.CONFLICT);
			}
			
			internationalizationService.saveProperty(propertyList.getList());
			return new ResponseEntity<Object>("Ok", HttpStatus.OK);
		} catch (Exception e) {
			 throw new ControllerException("ErrorConstants-Constant", e, HttpStatus.INTERNAL_SERVER_ERROR);
		}			
	}
	
}
