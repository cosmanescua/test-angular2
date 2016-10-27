package it.kirey.kfuture.restController;

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

import com.fasterxml.jackson.databind.ObjectMapper;

import it.kirey.kfuture.dao.impl.AmProductsHome;
import it.kirey.kfuture.dto.PaginationDto;
import it.kirey.kfuture.entity.AmProducts;

@RestController
public class ProductController {

	@Autowired
	private AmProductsHome amProductsHome;

	
	@RequestMapping(value = "/products", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Map<String, Object>> productList(@RequestParam(required = true) Map<String, String> paginationExp) throws Exception {

		ObjectMapper mapper = new ObjectMapper();
		PaginationDto paginationDto = null;

		paginationDto = mapper.readValue(paginationExp.get("pagination"), PaginationDto.class);

		List<AmProducts> productDtoList = amProductsHome.findAllPaginated(paginationDto);
		
		Long totalRows = amProductsHome.findTotalProductRows(paginationDto);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("data", productDtoList);
		map.put("totalRows", totalRows);

		return new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);
	}
}
