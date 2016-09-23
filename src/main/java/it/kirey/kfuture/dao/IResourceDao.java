package it.kirey.kfuture.dao;

import java.util.List;

import it.kirey.kfuture.entity.ResourceBundle;

public interface IResourceDao {
	public static final String SPRING_QUALIFIER = "resourceDao";

	public List<ResourceBundle> getResourceByLang(String code);

	public  ResourceBundle saveResource(ResourceBundle rb);
}
