db.createUser(
    {
        user: "pc-user",
        pwd: "pc-password",
        roles:[
            {
                role: "readWrite",
                db:   "product-collector"
            }
        ]
    }
);