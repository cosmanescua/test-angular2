package it.kirey.kfuture.service;

public interface CrudService<T> {
	public void saveOrUpdate(T obj);
	public T getById(Integer id);
}
