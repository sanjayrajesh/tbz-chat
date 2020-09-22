package ch.tbz.chat.domain.service.impl;

import ch.tbz.chat.domain.model.User;
import ch.tbz.chat.domain.model.UserDetailsImpl;
import ch.tbz.chat.domain.model.VerificationToken;
import ch.tbz.chat.domain.repository.UserRepository;
import ch.tbz.chat.domain.service.InvitationService;
import ch.tbz.chat.domain.service.UserService;
import ch.tbz.chat.domain.service.VerificationTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class UserServiceImpl extends CrudServiceImpl<User> implements UserService {

    private final BCryptPasswordEncoder passwordEncoder;
    private final InvitationService invitationService;
    private final VerificationTokenService verificationTokenService;

    @Autowired
    public UserServiceImpl(UserRepository repository, BCryptPasswordEncoder passwordEncoder, InvitationService invitationService, VerificationTokenService verificationTokenService) {
        super(repository);
        this.passwordEncoder = passwordEncoder;
        this.invitationService = invitationService;
        this.verificationTokenService = verificationTokenService;
    }

    @Override
    protected Collection<User> queryFindAll() {
        return ((UserRepository) repository).findAllByEnabledTrue();
    }

    @Override
    protected Optional<User> queryFindById(String id) {
        return ((UserRepository) repository).findByIdAndEnabledTrue(id);
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
        Optional<User> optional = ((UserRepository) repository).findByEmailAndEnabledTrue(email);

        if(optional.isPresent()) {
            return new UserDetailsImpl(optional.get());
        } else {
            throw new UsernameNotFoundException(email);
        }
    }

    @Override
    public User activateAccount(String verificationToken, String password) throws NoSuchElementException {
        VerificationToken token = verificationTokenService.findByToken(verificationToken);

        User user = token.getUser();

        user.setPassword(passwordEncoder.encode(password)).setEnabled(true);

        user = repository.save(user);

        verificationTokenService.delete(token);

        return user;
    }
}
