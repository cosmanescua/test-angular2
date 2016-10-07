package it.kirey.kfuture.template;

import java.io.IOException;
import java.io.Reader;
import java.io.StringReader;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import freemarker.cache.TemplateLoader;
import it.kirey.kfuture.dao.IAmEmailTemplatesHome;
import it.kirey.kfuture.entity.AmEmailTemplates;

@Service
public class EmailDatabaseTemplateLoader implements TemplateLoader {
	
	@Autowired
	IAmEmailTemplatesHome amEmailTemplatesHome;

	@Override
	public Object findTemplateSource(String templateName) throws IOException {
		return amEmailTemplatesHome.getEmailTemplate(templateName);
	}

	@Override
	public long getLastModified(Object templateSource) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public Reader getReader(Object templateSource, String encoding) throws IOException {
		return new StringReader(new String(((AmEmailTemplates) templateSource).getTemplate()));
	}

	@Override
	public void closeTemplateSource(Object templateSource) throws IOException {
		// TODO Auto-generated method stub

	}

}
