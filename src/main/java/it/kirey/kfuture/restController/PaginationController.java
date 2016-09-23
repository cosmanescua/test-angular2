package it.kirey.kfuture.restController;

import it.kirey.kfuture.dto.PaginationDto;
import it.kirey.kfuture.entity.Product;
import it.kirey.kfuture.service.IPaginationService;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@EnableSwagger2
@RestController
public class PaginationController {
	
	@Autowired
	private IPaginationService paginationService;
	
	//http://localhost:8080/KFutureDemo/pagination?page=1&size=10&sortType=asc&filter=
	@RequestMapping(value = "/pagination", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Product>> getPagination(@RequestParam(required = true) Integer page,
			@RequestParam(required = true) Integer size, @RequestParam(required = true) String sortType, @RequestParam(required = true) String filter) {		
		
		List<Product> list = paginationService.getAllProducts(page, size, sortType, filter);
		return new ResponseEntity<List<Product>>(list, HttpStatus.OK);
	}
	
	
	//RequestParam is PaginationDto class sent as urlencoded JSON object
	@RequestMapping(value = "/products", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Map<String, Object>> productList(@RequestParam(required = true) Map<String, String> paginationExp) {		
		
		ObjectMapper mapper = new ObjectMapper();
		
		PaginationDto paginationDto = null;
		try {
			paginationDto = mapper.readValue(paginationExp.get("pagination"), PaginationDto.class);
		} catch (JsonParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		  
		List<Product> productList = paginationService.getPaginatedProducts(paginationDto);
		Long totalRows = paginationService.getTotalProductRows(paginationDto);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("data", productList);
		map.put("totalRows", totalRows);
		
		return new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);
	}
	
	

}
