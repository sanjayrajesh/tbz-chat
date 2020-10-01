import Entity from "../models/Entity";
import EntityMap from "./EntityMap";

type EntityState<E extends Entity> = {
    byId: EntityMap<E>,
    allIds: string[]
}

export const createInitialState = () => ({
    byId: {},
    allIds: []
});

export default EntityState;