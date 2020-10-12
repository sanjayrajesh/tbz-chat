package ch.tbz.chat.domain.service.impl;

import ch.tbz.chat.config.InvitationProperties;
import ch.tbz.chat.domain.model.User;
import ch.tbz.chat.domain.model.VerificationToken;
import ch.tbz.chat.domain.service.InvitationService;
import ch.tbz.chat.domain.service.MailService;
import ch.tbz.chat.domain.service.TemplateService;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InvitationServiceImpl implements InvitationService {

    private final Logger logger;
    private final MailService mailService;
    private final TemplateService templateService;
    private final InvitationProperties invitationProperties;

    @Autowired
    public InvitationServiceImpl(Logger logger, MailService mailService, TemplateService templateService, InvitationProperties invitationProperties) {
        this.logger = logger;
        this.mailService = mailService;
        this.templateService = templateService;
        this.invitationProperties = invitationProperties;
    }

    @Override
    public void inviteUser(User user, VerificationToken token) {

        String activationUrl = invitationProperties.getBaseUrl() + "/" + token.getToken();

        String invitationTemplate = templateService.load("invitation.html", new Replacement("%EMAIL%", user.getEmail()), new Replacement("%ACTIVATION_URL%", activationUrl));

        mailService.send(user.getEmail(), invitationProperties.getSubject(), invitationTemplate, true);

        logger.debug("Sent invitation mail to '{}' with verification token '{}'", user.getEmail(), token.getToken());
    }
}
