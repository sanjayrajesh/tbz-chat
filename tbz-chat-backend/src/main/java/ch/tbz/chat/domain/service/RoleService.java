package ch.tbz.chat.domain.service;

import ch.tbz.chat.domain.model.Role;

public interface RoleService {

    Role findByName(String name);

    Role getMemberRole();

    Role getAdministratorRole();

}
