import { Router } from "express"
import { InternalServerError, BadRequest } from "http-errors"

import { getProjects, insertProject } from "../model"
import { retrieveProjectFromId, validateProject } from "../middleware"

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

apiRouter.post("/projects", validateProject, async (req, res, next) => {
    try {
        const newProject = await insertProject(res.locals.project)
        res.json(newProject)
    } catch (error) {
        next(InternalServerError(error.message))
    }
})

export default apiRouter
