package it.kirey.kfuture.dao.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.sql.DataSource;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.DistinctRootEntityResultTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import it.kirey.kfuture.dao.RoleDao;
import it.kirey.kfuture.entity.Role;
import it.kirey.kfuture.entity.User;

@Repository(value="roleDao")
@Transactional
public class RoleDaoImpl implements RoleDao {

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public void saveOrUpdate(Role role) {
		sessionFactory.getCurrentSession().saveOrUpdate(role);
	}

	@SuppressWarnings("unchecked")
	@Override
	public Set<Role> getRoles(String username) {
		User user = (User)sessionFactory.getCurrentSession().createCriteria(User.class).add(Restrictions.eq("username", username)).uniqueResult();
		return (Set<Role>)user.getRoles();
	}
}
