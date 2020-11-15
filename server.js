// Use Express
var express = require("express");
// Use body-parser
var bodyParser = require("body-parser");
// Use MongoDB
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
// The database variable
var database;
// The products collection
var PRODUCTS_COLLECTION = "products";

// The carts collection
var CARTS_COLLECTION = "carts";

// The carts collection
var WISHLISTS_COLLECTION = "wishlists";

// The users collection
var USERS_COLLECTION = "users";
// Create new instance of the express server
var app = express();

// Define the JSON parser as a default way 
// to consume and produce data through the 
// exposed APIs
app.use(bodyParser.json());

// Create link to Angular build directory
// The `ng build` command will save the result
// under the `dist` folder.
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Local database URI.
const LOCAL_DATABASE = "mongodb://localhost:27017/app";
// Local port.
const LOCAL_PORT = 8080;

// Init the server
mongodb.MongoClient.connect(process.env.MONGODB_URI || LOCAL_DATABASE,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }, function (error, client) {

        // Check if there are any problems with the connection to MongoDB database.
        if (error) {
            console.log(error);
            process.exit(1);
        }

        // Save database object from the callback for reuse.
        database = client.db();
        console.log("Database connection done.");

        // Initialize the app.
        var server = app.listen(process.env.PORT || LOCAL_PORT, function () {
            var port = server.address().port;
            console.log("App now running on port", port);
        });
    });

    /*  "/api/status"
 *   GET: Get server status
 *   PS: it's just an example, not mandatory
 */
app.get("/api/status", function (req, res) {
    res.status(200).json({ status: "UP" });
});

/*  "/api/products/:id"
 *   DELETE: deletes product by id
 */
app.delete("/api/products/:id", function (req, res) {
    if (req.params.id.length > 24 || req.params.id.length < 24) {
        manageError(res, "Invalid product id", "ID must be a single String of 12 bytes or a string of 24 hex characters.", 400);
    } else {
        database.collection(PRODUCTS_COLLECTION).deleteOne({ _id: new ObjectID(req.params.id) }, function (err, result) {
            if (err) {
                manageError(res, err.message, "Failed to delete product.");
            } else {
                res.status(200).json(req.params.id);
            }
        });
    }
});


/*  "/api/products"
 *   POST: creates a new product
 */
app.post("/api/products", function (req, res) {
    var product = req.body;

    if (!product.name) {
        manageError(res, "Invalid product input", "Name is mandatory.", 400);
    } else if (!product.brand) {
        manageError(res, "Invalid product input", "Brand is mandatory.", 400);
    } else {
        database.collection(PRODUCTS_COLLECTION).insertOne(product, function (err, doc) {
            if (err) {
                manageError(res, err.message, "Failed to create new product.");
            } else {
                res.status(201).json(doc.ops[0]);
            }
        });
    }
});



/*  "/api/products"
 *  GET: finds all products
 */
app.get("/api/products", function (req, res) {
    database.collection(PRODUCTS_COLLECTION).find({}).toArray(function (error, data) {
        if (error) {
            manageError(res, err.message, "Failed to get product.");
        } else {
            res.status(200).json(data);
        }
    });
});

app.put('/api/produts/:id',(req,res)=>{ 
    var data = req.body
    var id =req.params.id
    collection.updateOne({id:id},{$set:data})
        res.send('record is udated')   
})


/*  "/api/carts"
 *   POST: add product to cart
 */
app.post("/api/carts", function (req, res) {
    var product = req.body;

        database.collection(CARTS_COLLECTION).insertOne(product, function (err, doc) {
            if (err) {
                manageError(res, err.message, "Failed to create new product.");
            } else {
                res.status(201).json(doc.ops[0]);
            }
        });
    
});

/*  "/api/carts"
 *  GET: finds all carts
 */
app.get("/api/carts", function (req, res) {
    database.collection(CARTS_COLLECTION).find({}).toArray(function (error, data) {
        if (error) {
            manageError(res, err.message, "Failed to get cart.");
        } else {
            res.status(200).json(data);
        }
    });
});



/*  "/api/wishlists"
 *   POST: add product to wishlist
 */
app.post("/api/wishlists", function (req, res) {
    var product = req.body;

        database.collection(WISHLISTS_COLLECTION).insertOne(product, function (err, doc) {
            if (err) {
                manageError(res, err.message, "Failed to create new product.");
            } else {
                res.status(201).json(doc.ops[0]);
            }
        });
    
});

/*  "/api/wishlists"
 *  GET: finds all carts
 */
app.get("/api/wishlists", function (req, res) {
    database.collection(WISHLISTS_COLLECTION).find({}).toArray(function (error, data) {
        if (error) {
            manageError(res, err.message, "Failed to get product.");
        } else {
            res.status(200).json(data);
        }
    });
});


/*  "/api/wishlists/:id"
 *   DELETE: deletes product by id in wishlist
 */
app.delete("/api/wishlists/:id", function (req, res) {
        
        var product=req.params.productId
        database.collection(WISHLISTS_COLLECTION).deleteOne({id:product}, function (err, result) {
            if (err) {
                manageError(res, err.message, "Failed to delete product.");
            } else {
                res.status(200).json(req.params.id);
               
            }
        });
});

/*  "/api/cartts/:id"
 *   DELETE: deletes product by id in cart item list
 */
app.delete("/api/carts/:id", function (req, res) {
    var product=req.params.productId
  
    database.collection(CARTS_COLLECTION).deleteOne({id:product}, function (err, result) {
        if (err) {
            manageError(res, err.message, "Failed to delete product.");
        } else {
            res.status(200).json(req.params.id);
            //console.log(res.params.id)
           
        }
    });

});

/*  "/api/users"
 *   POST: add new user to db
 */
app.post("/api/users", function (req, res) {
    var user = req.body;

        database.collection(USERS_COLLECTION).insertOne(user, function (err, doc) {
            if (err) {
                manageError(res, err.message, "Failed to create new user.");
            } else {
                res.status(201).json(doc.ops[0]);
            }
        });
    
});

/*  "/api/users"
 *  GET: finds all Users
 */
app.get("/api/users", function (req, res) {
    database.collection(USERS_COLLECTION).find({}).toArray(function (error, data) {
        if (error) {
            manageError(res, err.message, "Failed to get user.");
        } else {
            res.status(200).json(data);
        }
    });
});

/*  "/api/user with username and password"
 *  GET: finds all Users
 */
app.get("/api/users/:username", function (req, res) {
    var uname= req.params.username
    var pass= req.params.password
    database.collection(USERS_COLLECTION).getUser({uname}).toArray(function (error, data) {
        if (error) {
            manageError(res, err.message, "Failed to get user.");
        } else {
            res.status(200).json(data);
        }
    });
});