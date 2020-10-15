package ch.tbz.chat.domain.service.impl;

import ch.tbz.chat.domain.model.User;
import ch.tbz.chat.domain.model.UserDetailsImpl;
import ch.tbz.chat.domain.model.VerificationToken;
import ch.tbz.chat.domain.repository.UserRepository;
import ch.tbz.chat.domain.service.InvitationService;
import ch.tbz.chat.domain.service.UserService;
import ch.tbz.chat.domain.service.VerificationTokenService;
import ch.tbz.chat.exception.ConflictException;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class UserServiceImpl extends CrudServiceImpl<User, UserRepository> implements UserService {

    private final BCryptPasswordEncoder passwordEncoder;
    private final InvitationService invitationService;
    private final VerificationTokenService verificationTokenService;
    private final Logger logger;

    @Autowired
    public UserServiceImpl(UserRepository repository, BCryptPasswordEncoder passwordEncoder, InvitationService invitationService, VerificationTokenService verificationTokenService, Logger logger) {
        super(repository);
        this.passwordEncoder = passwordEncoder;
        this.invitationService = invitationService;
        this.verificationTokenService = verificationTokenService;
        this.logger = logger;
    }

    @Override
    protected Collection<User> queryFindAll() {
        return repository.findAllByEnabledTrue();
    }

    @Override
    protected Optional<User> queryFindById(String id) {
        return repository.findByIdAndEnabledTrue(id);
    }

    @Override
    protected User preCreate(User user) {
        return user.setEnabled(false);
    }

    @Override
    protected User postCreate(User user) {
        VerificationToken token = verificationTokenService.create(user);

        invitationService.inviteUser(user, token);

        return user;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> optional = repository.findByEmailAndEnabledTrue(email);

        if(optional.isPresent()) {
            return new UserDetailsImpl(optional.get());
        } else {
            throw new UsernameNotFoundException(email);
        }
    }

    @Override
    public User activateAccount(String verificationToken, User userValues) throws NoSuchElementException {
        VerificationToken token = verificationTokenService.findByToken(verificationToken);

        User user = token.getUser();

        user.setPassword(passwordEncoder.encode(userValues.getPassword())).setEnabled(true);
        user.setUsername(userValues.getUsername());

        user = repository.save(user);

        verificationTokenService.delete(token);

        return user;
    }

    @Override
    public void changePassword(User user, String oldPassword, String newPassword) {
        if(passwordEncoder.matches(oldPassword, user.getPassword())) {
            user.setPassword(passwordEncoder.encode(newPassword));

            save(user);
        } else {
            throw new ConflictException("Incorrect password");
        }
    }

    @Override
    public Collection<User> search(String query, boolean excludeAuthenticated, User authenticated, String excludeChatId) {

        if(query.isBlank()) {
            query = null;
        }

        return repository.findAllByEmailOrUsername(query, excludeChatId, excludeAuthenticated ? authenticated.getId() : null);
    }
}
