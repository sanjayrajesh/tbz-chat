import { AxiosResponse } from "axios";
import Entity from "../models/Entity";

interface Response<T extends Entity> extends Promise<AxiosResponse<T>> {

}

export default Response;