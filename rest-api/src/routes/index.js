import { Router } from "express"
import {} from "http-errors"

import { getProjects, getProjectById } from "../model"

const apiRouter = Router()

apiRouter.get("/projects", async (req, res, next) => {
    const projects = await getProjects()
    res.json(projects)
})

apiRouter.get("/projects/:projectId", async (_req, res) => {
    const project = await getProjectById(projectId)
    res.json(project)
})

export default apiRouter
