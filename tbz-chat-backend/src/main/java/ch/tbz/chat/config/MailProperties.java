package ch.tbz.chat.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties("mail")
@Getter
@Setter
public class MailProperties {

    private String host;
    private int port;
    private String username;
    private String password;
    private String from;
    private Transport transport;
    private Smtp smtp;
    private boolean debug;

    @Getter @Setter
    public static class Transport {
        private String protocol;
    }

    @Getter @Setter
    public static class Smtp {
        private boolean auth;
        private StartTLS starttls;

        @Getter @Setter
        public static class StartTLS {
            private boolean enable;
        }
    }

}
