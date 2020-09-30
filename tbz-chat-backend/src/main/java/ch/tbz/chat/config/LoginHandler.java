package ch.tbz.chat.config;

import ch.tbz.chat.domain.datatransfer.user.UserDTO;
import ch.tbz.chat.domain.datatransfer.user.UserMappingStrategyFactory;
import ch.tbz.chat.domain.model.User;
import ch.tbz.chat.domain.model.UserDetailsImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

public class LoginHandler extends AbstractAuthenticationProcessingFilter {

    private final UserMappingStrategyFactory userMappingStrategyFactory;
    private final ObjectMapper objectMapper;
    private final JWTProperties jwtProperties;

    public LoginHandler(RequestMatcher requiresAuthenticationRequestMatcher, AuthenticationManager authenticationManager, UserMappingStrategyFactory userMappingStrategyFactory, JWTProperties jwtProperties) {
        super(requiresAuthenticationRequestMatcher);
        setAuthenticationManager(authenticationManager);
        this.userMappingStrategyFactory = userMappingStrategyFactory;
        this.jwtProperties = jwtProperties;
        this.objectMapper = new ObjectMapper();
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException, ServletException {
        UserDTO.WithPassword userDTO = objectMapper.readValue(request.getInputStream(), UserDTO.WithPassword.class);

        return getAuthenticationManager().authenticate(new UsernamePasswordAuthenticationToken(userDTO.getEmail(), userDTO.getPassword()));
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        User authenticated = ((UserDetailsImpl) authResult.getPrincipal()).getUser();

        String subject = authenticated.getId();

        String token = Jwts.builder()
                .setSubject(subject)
                .setExpiration(new Date(System.currentTimeMillis() + jwtProperties.getExpirationMillis()))
                .signWith(SignatureAlgorithm.HS512, jwtProperties.getSecret())
                .setIssuer(jwtProperties.getIssuer())
                .compact();

        response.addHeader(jwtProperties.getHeaderName(), jwtProperties.getTokenPrefix() + token);

        // Expose the Headers
        response.addHeader("Access-Control-Expose-Headers", jwtProperties.getHeaderName());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        UserDTO userDTO = userMappingStrategyFactory
                .getStrategy(conf -> conf.withChats(chatConf -> chatConf.withMessages().withUsers(userConf -> userConf.withRole())))
                .map(authenticated);

        objectMapper.writeValue(response.getOutputStream(), userDTO);
    }
}
