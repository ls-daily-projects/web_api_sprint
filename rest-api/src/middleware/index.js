import { getProjectById, getActionById } from "../model"
import { NotFound, BadRequest, InternalServerError } from "http-errors"

export const handle404 = (req, _res, next) => {
    const { method, path } = req
    const msg = `${method} ${path} has not been implemented.`
    next(NotFound(msg))
}

export const handle500 = ({ status = 500, name, message }, _req, res, next) => {
    if (res.headersSent) return next()
    res.status(status).json({ name, statusCode: status, message })
}

export const retrieveProjectFromId = async (req, res, next) => {
    const { projectId } = req.params
    if (!projectId) return next()

    try {
        const project = await getProjectById(projectId)
        if (!project) return next(NotFound("No project with that id!"))

        res.locals.project = project
        next()
    } catch (error) {
        next(InternalServerError(error.message))
    }
}

export const retrieveActionFromId = async (req, res, next) => {
    const { actionId } = req.params

    if (!actionId) return next()

    try {
        const action = await getActionById(actionId)
        if (!action) return next(NotFound("No action with that id!"))

        res.locals.action = action
        next()
    } catch (error) {
        next(InternalServerError(error.message))
    }
}

export const validateProject = (req, res, next) => {
    const { project } = req.body
    if (!project.name || !project.description)
        return next(
            BadRequest(
                "Please provide a name and a description for your project"
            )
        )
    if (req.method === "POST") {
        project.completed = false
    }
    res.locals.validatedProject = project
    next()
}

export const validateAction = (req, res, next) => {
    const { action } = req.body
    if (!action.description || !action.notes) {
        return next(
            BadRequest(
                "Please add the description and/or notes properties to your action."
            )
        )
    }
    if (req.method === "POST") {
        action.completed = false
    }
    res.locals.validatedAction = action
    next()
}
