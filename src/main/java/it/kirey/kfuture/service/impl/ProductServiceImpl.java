package it.kirey.kfuture.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.kirey.kfuture.dao.IAmProductsHome;
import it.kirey.kfuture.dto.PaginationDto;
import it.kirey.kfuture.entity.AmProducts;
import it.kirey.kfuture.service.IProductService;

@Service(IProductService.SERVICE_QUALIFIER)
public class ProductServiceImpl implements IProductService{

	@Autowired
	private IAmProductsHome amProductsHome;
		
	@Override
	@Transactional
	public List<AmProducts> getPaginatedProduct(PaginationDto paginationDto) {
		List<AmProducts> productEntityList = amProductsHome.getAll(paginationDto);
		return productEntityList;
	}

	@Override
	@Transactional
	public Long getTotalProductRows(PaginationDto paginationDto) {
		Long totalRows = amProductsHome.getTotalProductRows(paginationDto);
		return totalRows;
	}

	
}
