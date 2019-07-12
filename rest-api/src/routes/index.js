import { Router } from "express"
import { InternalServerError } from "http-errors"

import {
    getProjects,
    insertProject,
    updateProject,
    removeProject,
    getProjectActions,
    insertAction,
    updateAction
} from "../model"
import {
    retrieveProjectFromId,
    validateProject,
    validateAction,
    retrieveActionFromId
} from "../middleware"

const apiRouter = Router()

apiRouter.get("/projects", async (req, res, next) => {
    try {
        const projects = await getProjects()
        res.json(projects)
    } catch (error) {
        next(InternalServerError(error.message))
    }
})

apiRouter.get("/projects/:projectId", retrieveProjectFromId, (_req, res) => {
    res.json(res.locals.project)
})

apiRouter.post("/projects", validateProject, async (_req, res, next) => {
    try {
        const newProject = await insertProject(res.locals.validatedProject)
        res.json(newProject)
    } catch (error) {
        next(InternalServerError(error.message))
    }
})

apiRouter.put(
    "/projects/:projectId",
    retrieveProjectFromId,
    validateProject,
    async (_req, res, next) => {
        const { validatedProject, project } = res.locals
        try {
            const updatedProject = await updateProject(
                project.id,
                validatedProject
            )
            res.json(updatedProject)
        } catch (error) {
            next(InternalServerError(error.message))
        }
    }
)

apiRouter.delete(
    "/projects/:projectId",
    retrieveProjectFromId,
    async (_req, res, next) => {
        const { project } = res.locals
        try {
            await removeProject(project.id)
            res.sendStatus(204)
        } catch (error) {
            next(InternalServerError(error.message))
        }
    }
)

apiRouter.get(
    "/projects/:projectId/actions",
    retrieveProjectFromId,
    async (_req, res, next) => {
        const { project } = res.locals

        try {
            const actions = await getProjectActions(project.id)
            res.json(actions)
        } catch (error) {
            next(InternalServerError(error.message))
        }
    }
)

apiRouter.post(
    "/projects/:projectId/actions",
    retrieveProjectFromId,
    validateAction,
    async (_req, res, next) => {
        const { project, validatedAction } = res.locals

        try {
            const newAction = await insertAction({
                project_id: project.id,
                ...validatedAction
            })
            res.json(newAction)
        } catch (error) {
            next(InternalServerError(error.message))
        }
    }
)

apiRouter.put(
    "/projects/:projectId/actions/:actionId",
    retrieveProjectFromId,
    validateAction,
    retrieveActionFromId,
    async (_req, res, next) => {
        const { project, validatedAction, action } = res.locals

        try {
            const updatedAction = await updateAction(action.id, {
                project_id: project.id,
                ...validatedAction
            })
            res.json(updatedAction)
        } catch (error) {
            next(InternalServerError(error.message))
        }
    }
)

export default apiRouter
