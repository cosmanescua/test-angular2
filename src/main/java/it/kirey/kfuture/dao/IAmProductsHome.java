package it.kirey.kfuture.dao;

import java.util.List;

import it.kirey.kfuture.dto.PaginationDto;
import it.kirey.kfuture.entity.AmProducts;

public interface IAmProductsHome {
	public static final String REPOSITORY_QUALIFIER = "amProductsHome";
	
	public List<AmProducts> getAll(PaginationDto paginationDto);

	public void persist(AmProducts transientInstance);
	
	public void attachDirty(AmProducts instance);
	
	public void attachClean(AmProducts instance);
	
	public void delete(AmProducts persistentInstance);
	
	public AmProducts merge(AmProducts detachedInstance);
	
	public AmProducts findById(Integer id);

	public List<AmProducts> getAll();

	public Long getTotalProductRows(PaginationDto paginationDto);

}
