package ch.tbz.chat.config;

import ch.tbz.chat.domain.model.UserDetailsImpl;
import ch.tbz.chat.domain.service.UserService;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.NoSuchElementException;

public class AuthenticationFilter extends OncePerRequestFilter {

    private final UserService userService;
    private final JWTProperties jwtProperties;

    public AuthenticationFilter(UserService userService, JWTProperties jwtProperties) {
        this.userService = userService;
        this.jwtProperties = jwtProperties;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
            String authorizationHeader = request.getHeader(jwtProperties.getHeaderName());

            if (authorizationHeader != null) {
                SecurityContextHolder.getContext().setAuthentication(authenticate(authorizationHeader));
            }

            filterChain.doFilter(request, response);
    }

    private Authentication authenticate(String header) {
        if (header.startsWith(jwtProperties.getTokenPrefix())) {
            try {
                String userId = parseSubject(header);

                UserDetails userDetails = new UserDetailsImpl(userService.findById(userId));

                return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            } catch (JwtException | NoSuchElementException exception) {
                logger.debug("Exception", exception);
            }
        }

        throw new HttpClientErrorException(HttpStatus.FORBIDDEN);
    }

    private String parseSubject(String header) throws JwtException {
        return Jwts.parser()
                .setSigningKey(jwtProperties.getSecret())
                .parseClaimsJws(header.replace(jwtProperties.getTokenPrefix(), ""))
                .getBody()
                .getSubject();
    }
}
