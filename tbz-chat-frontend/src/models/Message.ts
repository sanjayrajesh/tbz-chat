import { Moment } from "moment";
import Entity from "./Entity";

interface Message extends Entity {
    body: string,
    timestamp: Moment,
    authorId: string
}

export default Message;