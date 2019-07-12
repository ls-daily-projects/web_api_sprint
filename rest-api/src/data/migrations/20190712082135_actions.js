export const up = knex =>
    knex.schema.createTable("actions", actions => {
        actions.increments()

        actions
            .integer("project_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("projects")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")

        actions.string("description", 128).notNullable()
        actions.text("notes").notNullable()
        actions.boolean("completed").defaultTo(false)
    })

export const down = knex => knex.schema.dropTableIfExists("actions")
