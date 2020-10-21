# TBZ-Chat

### Different profiles
The TBZ-Chat application can be run with two different profiles used to determine which DBMS is used:
 * postgres (default)
 * mariadb

### Configuration via environment variables
Name | Default value | Description
-----|-------|-------------
SPRING_PROFILES_ACTIVE | postgres | The profile used to determine which DBMS is used
SPRING_DATASOURCE_URL | postgres: _jdbc:postgresql://host.docker.internal:5432/tbz_chat_<br><br>mariadb: _jdbc:mariadb://host.docker.internal:3306/tbz_chat_ | Database connection URL
SPRING_DATASOURCE_USERNAME | postgres: _postgres_<br><br>mariadb: _root_ | Database connection username
SPRING_DATASOURCE_PASSWORD | postgres: _postgres_<br><br>mariadb: _root_ | Database connection password
REACT_APP_API_URL | http://localhost/api | URL for the User interface to use to access the REST API
INVITATION_BASE_URL | http://localhost/activate-account | The base URL used to generate the account activation link sent via email