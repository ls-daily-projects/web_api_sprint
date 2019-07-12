import { Router } from "express"
import { InternalServerError, NotFound } from "http-errors"

import { getProjects } from "../model"
import { retrieveProjectFromId } from "../middleware"

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

export default apiRouter
