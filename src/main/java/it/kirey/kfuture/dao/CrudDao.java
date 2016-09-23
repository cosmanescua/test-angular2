package it.kirey.kfuture.dao;

public interface CrudDao<T> {
	/**
	 * Saves or updates an entity into database.
	 * @param obj
	 */
	public void saveOrUpdate(T obj);
	/**
	 * Retrieves an object from database based on it's ID attribute.
	 * @param id
	 * @return T
	 */
	public T getById(Integer id);
}
