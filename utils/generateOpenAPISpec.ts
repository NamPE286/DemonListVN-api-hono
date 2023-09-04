import swaggerJsdoc from "npm:swagger-jsdoc"

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "REST API Docs",
            version: '1.0.0',
        },
        components: {
            securitySchemas: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["**/*.ts"],
}

const swaggerSpec = swaggerJsdoc(options);

Deno.writeTextFile('./openAPISpec.json', JSON.stringify(swaggerSpec)).then(() => {
    console.log(swaggerSpec)
    console.log('OpenAPI specification written to /openAPISpec.json')
}).catch((err) => {
    console.log(err)
})