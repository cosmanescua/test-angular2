package it.kirey.kfuture.dao.impl;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import it.kirey.kfuture.dao.IPaginationDao;
import it.kirey.kfuture.dto.FilterDto;
import it.kirey.kfuture.dto.PaginationDto;
import it.kirey.kfuture.entity.Product;

import java.sql.Date;
import java.util.Iterator;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;

@Repository(value = IPaginationDao.SPRING_QUALIFIER)
@Transactional
public class PaginationDaoImpl implements IPaginationDao {

	StringBuilder hqlSB = new StringBuilder();
	
	@Autowired
	private SessionFactory sessionFactory;

	@SuppressWarnings("unchecked")
	@Override
	public List<Product> getAllProducts(int page, int size, String sortType, String filter) {

		Criteria results = sessionFactory.getCurrentSession().createCriteria(Product.class);
		results.add(Restrictions.like("name", "%" + filter + "%"));
		results.setFirstResult((page - 1) * size);
		results.setMaxResults(size);
		return results.list();

	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Product> getPaginatedProducts(PaginationDto paginationDto) {

		hqlSB.setLength(0);
		hqlSB.append("from Product as product ");
		
		if (paginationDto.getFilterList().size() != 0) {
		Iterator<FilterDto> filterList = paginationDto.getFilterList().iterator();
			hqlSB.append("where ");
			while (filterList.hasNext()) {
				FilterDto filter= filterList.next();
				
				if(filter.getQuery() instanceof  String){
					hqlSB.append("lower(");
					hqlSB.append(filter.getField());
					hqlSB.append(") like '%");
					hqlSB.append(filter.getQuery().toString().toLowerCase());
					hqlSB.append("%' ");
				}
				else if(filter.getQuery() instanceof  Long)	{
					hqlSB.append(filter.getField());
					hqlSB.append(" = to_date('");
					hqlSB.append(new Date((Long)filter.getQuery()));
					hqlSB.append("','YYYY-MM-DD') ");
				}
				else{
					hqlSB.append(filter.getField());
					hqlSB.append(" = ");
					hqlSB.append(filter.getQuery());
					hqlSB.append(" ");
				}
				if(filterList.hasNext()){
					hqlSB.append(" and ");
				}
			}
		}
		if(paginationDto.getSort().getField() != null){
			hqlSB.append("order by ");
			hqlSB.append(paginationDto.getSort().getField());
			hqlSB.append(" ");
			hqlSB.append(paginationDto.getSort().getType());
		}

		return (List<Product>) sessionFactory.getCurrentSession().createQuery(hqlSB.toString())
				.setFirstResult((paginationDto.getPage() - 1) * paginationDto.getPageSize())
				.setMaxResults(paginationDto.getPageSize()).list();
	}

	@Override
	public Long getTotalProductRows(PaginationDto paginationDto) {

		hqlSB.setLength(0);
		hqlSB.append("select count(*) from Product as product");
		if (paginationDto.getFilterList().size() != 0) {
			Iterator<FilterDto> filterList = paginationDto.getFilterList().iterator();
			hqlSB.append(" where ");
			while (filterList.hasNext()) {
				FilterDto filter= filterList.next();
				if(filter.getQuery() instanceof  String){
					hqlSB.append("lower(");
					hqlSB.append(filter.getField());
					hqlSB.append(") like '%");
					hqlSB.append(filter.getQuery().toString().toLowerCase());
					hqlSB.append("%' ");
				}
				else if(filter.getQuery() instanceof  Long)	{
					hqlSB.append(filter.getField());
					hqlSB.append(" = to_date('");
					hqlSB.append(new Date((Long)filter.getQuery()));
					hqlSB.append("','YYYY-MM-DD') ");
				}
				else{
					hqlSB.append(filter.getField());
					hqlSB.append(" = ");
					hqlSB.append(filter.getQuery());
					hqlSB.append(" ");
				}
				if(filterList.hasNext()){
					hqlSB.append(" and ");
				}
			}
		}
		Long count = (Long) sessionFactory.getCurrentSession().createQuery(hqlSB.toString()).uniqueResult();
		return count;
	}
	
}