package ch.tbz.chat.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@ConfigurationProperties(prefix = "jwt")
@Component
public class JWTProperties {

    private String headerName = "Authorization";
    private String tokenPrefix = "Bearer";
    private long expirationMillis = 99999999L;
    private String issuer = "TBZ-Chat";
    private String secret = "d715bb59-2a19-44ee-a070-01c520f3a4de";

    public String getHeaderName() {
        return headerName;
    }

    public JWTProperties setHeaderName(String headerName) {
        this.headerName = headerName;
        return this;
    }

    public String getTokenPrefix() {
        return tokenPrefix + " ";
    }

    public JWTProperties setTokenPrefix(String tokenPrefix) {
        this.tokenPrefix = tokenPrefix;
        return this;
    }

    public long getExpirationMillis() {
        return expirationMillis;
    }

    public JWTProperties setExpirationMillis(long expirationMillis) {
        this.expirationMillis = expirationMillis;
        return this;
    }

    public String getIssuer() {
        return issuer;
    }

    public JWTProperties setIssuer(String issuer) {
        this.issuer = issuer;
        return this;
    }

    public String getSecret() {
        return secret;
    }

    public JWTProperties setSecret(String secret) {
        this.secret = secret;
        return this;
    }
}
