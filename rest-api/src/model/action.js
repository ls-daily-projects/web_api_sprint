import db from "../data"
import { actionToBody } from "./utils"

export const getActionById = async id => {
    let query = db("actions")

    if (id) {
        const action = await query.where("id", id).first()
        return actionToBody(action)
    }

    const actions = await query
    return actions.map(action_1 => actionToBody(action_1))
}

export const insertAction = action =>
    db("actions")
        .insert(action)
        .then(([id]) => this.get(id))

export const updateAction = (id, changes) =>
    db("actions")
        .where("id", id)
        .update(changes)
        .then(count => (count > 0 ? this.get(id) : null))

export const removeAction = id =>
    db("actions")
        .where("id", id)
        .del()
