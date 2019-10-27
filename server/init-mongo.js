db.createUser({
    user: "tanzim",
    pwd: "root101",
    roles: [
        {
            role: "readWrite",
            db: "graphql-tutorial"
        }
    ]
});