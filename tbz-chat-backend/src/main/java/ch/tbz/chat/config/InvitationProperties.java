package ch.tbz.chat.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties("invitation")
@Getter
@Setter
public class InvitationProperties {

    private String baseUrl;
    private String subject;

}
