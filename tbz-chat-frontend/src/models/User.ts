import Entity from "./Entity";

interface User extends Entity {
    email: string,
    username: string | null
}

export default User;