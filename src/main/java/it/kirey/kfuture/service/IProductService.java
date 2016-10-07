package it.kirey.kfuture.service;

import java.util.List;

import it.kirey.kfuture.dto.PaginationDto;
import it.kirey.kfuture.entity.AmProducts;

public interface IProductService {
	public static final String SERVICE_QUALIFIER = "productService";

	public List<AmProducts> getPaginatedProduct(PaginationDto paginationDto);

	public Long getTotalProductRows(PaginationDto paginationDto); 

}
