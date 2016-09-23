package it.kirey.kfuture.util;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import com.fasterxml.jackson.databind.type.CollectionType;

/**
 * Class that transforms one object type into another.
 * <pre><code>
 * {@literal @}Autowired
 * private ObjectTransformer transformer;
 * 
 * Customer customer = new Customer();
 * customer.setName("John Deer");
 * customer.setAge(25);
 * 
 * CustomerDTO customerDTO = transformer.build(customer, CustomerDTO.class);
 * logger.info(customerDTO);
 * </code></pre>
 * If transforming a list of objects into another list of objects.
 * <pre><code>
 * {@literal @}Autowired
 * private ObjectTransformer transformer;
 * 
 * Customer customer = new Customer();
 * customer.setName("John Deer");
 * customer.setAge(25);
 * List{@literal <}Customer{@literal >} customers = new ArrayList{@literal <}Customer{@literal >}();
 * customers.add(customer);
 * 
 * List{@literal <}CustomerDTO{@literal >} customersDTO = transformer.build(customers, CustomerDTO.class);
 * logger.info(java.util.Arrays(customersDTO.toArray());
 * </code></pre>
 * @author gavricn
 *
 * @param <T>
 * @param <E>
 */
public class ObjectTransformer<T, E> {
	/**
	 * Stored object.
	 */
	private E toRet;
	/**
	 * ModelMapper used for mapping from/to objects.
	 */
	@Autowired
	private ModelMapper modelMapper;
	
	/**
	 * Getter
	 * @return E
	 */
	public E get() {
		return toRet;
	}
	
	/**
	 * Transforms one object type into another and validates properties from both classes. Where first parameter is an object
	 * and second parameter represents Class that is gonna be transformed to.
	 * @param obj
	 * @param clazz
	 * @exception org.modelmapper.ValidationException If destination class doesn't have a property that a source class has.
	 * @return E
	 */
	public E buildWithValidation(T obj, Class<E> clazz) {
		this.toRet = this.modelMapper.map(obj, clazz);
		this.modelMapper.validate();
		return this.get();
	}
	
	/**
	 * Transforms one object type into another. Where first parameter is an object
	 * and second parameter represents Class that is gonna be transformed to.
	 * @param obj
	 * @param clazz
	 * @return E
	 */
	public E build(T obj, Class<E> clazz) {
		this.toRet = this.modelMapper.map(obj, clazz);
		return this.get();
	}
	
	/**
	 * Transforms List of objects into List of another objects. First parameter is a List
	 * of objects and second parameter represents a single Class into which to map.
	 * @param obj
	 * @param clazz
	 * @return E
	 */
	public List<E> build(List<T> obj, Class<E> clazz) {
		List<E> elements = new ArrayList<E>();
		for(T o : obj) {
			E convertedObject = this.modelMapper.map(o, clazz);
			elements.add(convertedObject);
		}
		return elements;
	}
	
	/**
	 * Transforms List of objects into List of another objects with validation. First parameter is a List
	 * of objects and second parameter represents a single Class into which to map.
	 * @param obj
	 * @param clazz
	 * @exception org.modelmapper.ValidationException If destination class doesn't have a property that a source class has.
	 * @return E
	 */
	public List<E> buildWithValidation(List<T> obj, Class<E> clazz) {
		List<E> elements = new ArrayList<E>();
		for(T o : obj) {
			E convertedObject = this.modelMapper.map(o, clazz);
			this.modelMapper.validate();
			elements.add(convertedObject);
		}
		return elements;
	}
}