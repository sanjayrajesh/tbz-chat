package ch.tbz.chat.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
public class MailConfiguration {

    @Bean
    public JavaMailSenderImpl javaMailSender(MailProperties mailProperties) {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();

        mailSender.setHost(mailProperties.getHost());
        mailSender.setPort(mailProperties.getPort());
        mailSender.setUsername(mailProperties.getUsername());
        mailSender.setPassword(mailProperties.getPassword());

        Properties properties = mailSender.getJavaMailProperties();
        properties.put("mail.transport.protocol", mailProperties.getTransport().getProtocol());
        properties.put("mail.smtp.auth", Boolean.toString(mailProperties.getSmtp().isAuth()));
        properties.put("mail.smtp.starttls.enable", Boolean.toString(mailProperties.getSmtp().getStarttls().isEnable()));
        properties.put("mail.debug", Boolean.toString(mailProperties.isDebug()));

        return mailSender;
    }

}
