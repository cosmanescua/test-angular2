package it.kirey.kfuture.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.kirey.kfuture.dto.PaginationDto;
import it.kirey.kfuture.service.IPaginationService;

@Service(value = IPaginationService.SERVICE_QUALIFIER)
public class PaginationServiceImpl implements IPaginationService{
/*
	@Autowired
	IPaginationDao paginationDao;

	@Override
	public List<Product> getAllProducts(int page, int size, String sortType, String filter) {
		return paginationDao.getAllProducts(page, size, sortType, filter);
	}

	@Override
	public List<Product> getPaginatedProducts(PaginationDto paginationDto) {
		List<Product> productList = paginationDao.getPaginatedProducts(paginationDto);
		return productList;
	}

	@Override
	public Long getTotalProductRows(PaginationDto paginationDto) {
		Long productCounter = paginationDao.getTotalProductRows(paginationDto);
		return productCounter;
	}*/

}
