import User from "../../models/User";
import EntityMap from "../../util/EntityMap";
import Selector from "../../util/Selector";
import SelectorWithProps from "../../util/SelectorWithProps";

export const getUser: SelectorWithProps<User | undefined, string> = (state, id) => state.users.byId[id];

export const getUsers: Selector<EntityMap<User>> = state => state.users.byId;