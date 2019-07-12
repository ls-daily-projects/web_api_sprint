import { Router } from "express"
import { InternalServerError, BadRequest } from "http-errors"

import { getProjects, insertProject } from "../model"
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

apiRouter.post("/projects", async (req, res, next) => {
    const { project } = req.body
    project.completed = false

    if (!project.name || !project.description)
        return next(
            BadRequest(
                "Please provide a name and a description for your project"
            )
        )

    try {
        const newProject = await insertProject(project)
        res.json(newProject)
    } catch (error) {
        next(InternalServerError(error.message))
    }
})

export default apiRouter
