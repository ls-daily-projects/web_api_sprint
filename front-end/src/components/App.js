import React, { useState, useEffect } from "react"
import axios from "axios"

import LoadingIndicator from "./LoadingIndicator"

const App = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [projects, setProjects] = useState([])

    useEffect(() => {
        axios
            .get("/api/projects")
            .then(({ data }) => {
                setProjects(data)
            })
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false))
    }, [])

    useEffect(() => {
        localStorage.setItem("projects", JSON.stringify(projects))
    }, [projects])

    if (isLoading) {
        return <LoadingIndicator />
    }
    return (
        <>
            <h1>Projects</h1>
            <ul>
                {projects.map(({ id, name, description, completed }) => (
                    <li key={id}>
                        {completed ? "✅" : "❌"}
                        <h3>{name}</h3>

                        <small>{description}</small>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default App
