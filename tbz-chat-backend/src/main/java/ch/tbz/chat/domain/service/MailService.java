package ch.tbz.chat.domain.service;

public interface MailService {

    void send(String recipient, String subject, String body, boolean html);

}
