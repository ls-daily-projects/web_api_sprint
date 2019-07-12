const intToBoolean = int => int === 1

export const projectToBody = project => {
    const result = {
        ...project,
        completed: intToBoolean(project.completed)
    }

    if (project.actions) {
        result.actions = project.actions.map(action => ({
            ...action,
            completed: intToBoolean(action.completed)
        }))
    }

    return result
}

export const actionToBody = action => ({
    ...action,
    completed: intToBoolean(action.completed)
})
