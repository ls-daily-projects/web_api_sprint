import db from "../data"
import { projectToBody, actionToBody } from "./utils"

export const getProjects = () => db("projects")

export const getProjectById = async id => {
    let query = db("projects as p")

    if (id) {
        query.where("p.id", id).first()

        const promises = [query, getProjectActions(id)] // [ projects, actions ]

        let results = await Promise.all(promises)
        let [project, actions] = results

        if (project) {
            project.actions = actions
            return projectToBody(project)
        } else {
            return null
        }
    }

    const projects = await query
    return projects.map(project => projectToBody(project))
}

export const insertProject = async project => {
    const [id] = await db("projects").insert(project)
    return getProjectById(id)
}

export const updateProject = async (id, changes) => {
    const count = await db("projects")
        .where("id", id)
        .update(changes)
    return count > 0 ? getProjectById(id) : null
}

export const removeProject = id => {
    return db("projects")
        .where("id", id)
        .del()
}

export const getProjectActions = async projectId => {
    const actions = await db("actions").where("project_id", projectId)
    return actions.map(action => actionToBody(action))
}
