import Entity from "../models/Entity";
import EntityMap from "./EntityMap";
import EntityState from "./EntityState";

const normalizeArray = <E extends Entity>(entities: E[]): EntityState<E> => {
    let map: EntityMap<E> = {};

    entities.forEach(entity => map[entity.id] = entity);

    return {
        byId: map,
        allIds: entities.map(entity => entity.id)
    }
}

export default normalizeArray;