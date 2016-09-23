package it.kirey.kfuture.service;

import java.util.List;

import it.kirey.kfuture.dto.PaginationDto;
import it.kirey.kfuture.entity.Product;

public interface IPaginationService {
	
	public static final String SPRING_QUALIFIER = "paginationService";
	
	public List<Product> getAllProducts(int page, int size, String sortType, String filter);

	public List<Product> getPaginatedProducts(PaginationDto paginationDto);

	public Long getTotalProductRows(PaginationDto paginationDto);

}
