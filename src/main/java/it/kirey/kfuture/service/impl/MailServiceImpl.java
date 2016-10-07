package it.kirey.kfuture.service.impl;

import java.util.HashMap;
import java.util.Map;

import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import freemarker.template.Configuration;
import it.kirey.kfuture.common.Const;
import it.kirey.kfuture.dao.IAmEmailConfigsHome;
import it.kirey.kfuture.dto.CustomerDto;
import it.kirey.kfuture.entity.AmEmailConfigs;
import it.kirey.kfuture.service.IMailService;

@Service(value=IMailService.SERVICE_QUALIFIER)
public class MailServiceImpl implements IMailService {

	@Autowired
	public JavaMailSenderImpl mailSender;
	
	@Autowired
	public IAmEmailConfigsHome amEmailConfigsHome;
	
	@Autowired
	public Configuration freemarkerConfiguration;

	@Override
	public void sendEmail(CustomerDto customer) {

		MimeMessagePreparator preparator = createMessage(customer);
		setMailConfigProperties();
		try {
			mailSender.send(preparator);
		} catch (MailException ex) {
			System.err.println(ex.getMessage());
		}
	}

	private MimeMessagePreparator createMessage(final CustomerDto customer) {

		MimeMessagePreparator preparator = new MimeMessagePreparator() {

			public void prepare(MimeMessage mimeMessage) throws Exception {
				MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

				helper.setSubject("Email from Kirey with attachement");
				helper.setFrom(new InternetAddress("mail.testing.k@gmail.com", "Message from Kirey"));
				helper.setTo(customer.getEmail());
				
				Map<String, Object> model = new HashMap<String, Object>();
                model.put("customer", customer);
                 
                String text = getFreeMarkerTemplateContent(model);//Use Freemarker
 
                // use the true flag to indicate you need a multipart message
                helper.setText(text, true);

				// Add an inline resource.
				helper.addInline("company-logo", new ClassPathResource("kireyLogo.jpg"));
				// Add a resource as an attachment
				helper.addAttachment("doc.pdf", new ClassPathResource("test.pdf"));

			}
		};
		return preparator;
	}
	
	private void setMailConfigProperties(){
		AmEmailConfigs emailConfigs = amEmailConfigsHome.getEmailConfigs();
		mailSender.setUsername(emailConfigs.getUsername());
		mailSender.setPassword(emailConfigs.getPassword());
		mailSender.setHost(emailConfigs.getHost());
		mailSender.setPort(emailConfigs.getPort());
	}
    
	public String getFreeMarkerTemplateContent(Map<String, Object> model) {
		StringBuffer content = new StringBuffer();

		try {
			content.append(FreeMarkerTemplateUtils
					.processTemplateIntoString(freemarkerConfiguration.getTemplate(Const.EMAIL_TEMPLATE_NAME), model));

			return content.toString();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return "";
	}
}
