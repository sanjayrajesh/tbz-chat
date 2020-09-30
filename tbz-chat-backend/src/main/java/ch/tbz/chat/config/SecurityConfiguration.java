package ch.tbz.chat.config;

import ch.tbz.chat.domain.datatransfer.MappingStrategy;
import ch.tbz.chat.domain.datatransfer.user.UserDTO;
import ch.tbz.chat.domain.datatransfer.user.UserMappingStrategyFactory;
import ch.tbz.chat.domain.model.User;
import ch.tbz.chat.domain.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
@DependsOn({"userMappingStrategy"})
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final UserService userService;
    private final MappingStrategy<UserDTO, User> userMappingStrategy;
    private final JWTProperties jwtProperties;

    @Autowired
    public SecurityConfiguration(UserService userService, MappingStrategy<UserDTO, User> userMappingStrategy, JWTProperties jwtProperties) {
        this.userService = userService;
        this.userMappingStrategy = userMappingStrategy;
        this.jwtProperties = jwtProperties;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService).passwordEncoder(passwordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors().and().csrf().disable()
                .authorizeRequests().antMatchers(HttpMethod.POST, "/login", "/users", "/verification/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .addFilterAfter(loginHandler(), UsernamePasswordAuthenticationFilter.class)
                .addFilterAfter(authenticationFilter(), UsernamePasswordAuthenticationFilter.class)
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }

    @Bean
    public static BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public LoginHandler loginHandler() throws Exception {
        return new LoginHandler(new AntPathRequestMatcher("/login", "POST"), authenticationManager(), userMappingStrategy, jwtProperties);
    }

    @Bean
    public AuthenticationFilter authenticationFilter() {
        return new AuthenticationFilter(userService, jwtProperties);
    }

}
