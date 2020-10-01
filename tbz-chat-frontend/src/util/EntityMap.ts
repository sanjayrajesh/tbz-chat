import Entity from "../models/Entity";

type EntityMap<E extends Entity> = {
    [id: string]: E
}

export default EntityMap;