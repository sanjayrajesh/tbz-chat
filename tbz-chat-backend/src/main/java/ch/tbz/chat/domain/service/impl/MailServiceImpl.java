package ch.tbz.chat.domain.service.impl;

import ch.tbz.chat.config.MailProperties;
import ch.tbz.chat.domain.service.MailService;
import org.slf4j.Logger;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class MailServiceImpl implements MailService {

    private final JavaMailSender mailSender;
    private final MailProperties mailProperties;
    private final Logger logger;

    public MailServiceImpl(JavaMailSender mailSender, MailProperties mailProperties, Logger logger) {
        this.mailSender = mailSender;
        this.mailProperties = mailProperties;
        this.logger = logger;
    }

    @Override
    public void send(String recipient, String subject, String body, boolean html) {
        try{
            MimeMessage message = mailSender.createMimeMessage();

            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom(mailProperties.getFrom());
            helper.setSubject(subject);
            helper.setTo(recipient);
            helper.setText(body, html);

            mailSender.send(message);
        } catch (MessagingException e) {
            logger.error("Exception while sending mail", e);
        }
    }
}
