package ch.tbz.chat.domain.service.impl;

import ch.tbz.chat.domain.model.Role;
import ch.tbz.chat.domain.repository.RoleRepository;
import ch.tbz.chat.domain.service.RoleService;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepository repository;
    private Role memberRole;
    private Role administratorRole;

    public RoleServiceImpl(RoleRepository repository) {
        this.repository = repository;

        loadRoles();
    }

    private void loadRoles() {
        try {
            memberRole = findByName(Role.MEMBER);
            administratorRole = findByName(Role.ADMINISTRATOR);
        } catch (NoSuchElementException e) {
            throw new IllegalStateException(e.getMessage());
        }
    }

    @Override
    public Role findByName(String name) {
        Optional<Role> optional = repository.findByName(name);
        if(optional.isPresent()) {
            return optional.get();
        } else {
            throw new NoSuchElementException(String.format("Role with name '%s' not found", name));
        }
    }

    @Override
    public Role getMemberRole() {
        return memberRole;
    }

    @Override
    public Role getAdministratorRole() {
        return administratorRole;
    }
}
