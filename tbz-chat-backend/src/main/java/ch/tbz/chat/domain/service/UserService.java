package ch.tbz.chat.domain.service;

import ch.tbz.chat.domain.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.NoSuchElementException;

public interface UserService extends UserDetailsService, CrudService<User> {

    User activateAccount(String verificationToken, User user) throws NoSuchElementException;

    void changePassword(User user, String oldPassword, String newPassword);

}
