export const up = knex =>
    knex.schema.createTable("projects", projects => {
        projects.increments()

        projects.string("name", 128).notNullable()
        projects.text("description").notNullable()
        projects.boolean("completed").defaultTo(false)
    })

export const down = knex => knex.schema.dropTableIfExists("projects")
