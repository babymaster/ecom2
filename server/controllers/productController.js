console.log(">> SERVER > productController.js".blue);


module.exports = {

    // ============= create NEW product ============
    createProduct: (req, res) => {
        console.log('>> SERVER > productController.js > createProduct'.blue);
        console.log("MySQL connected as id ".yellow + connection.threadId);
        var sql = `INSERT INTO products (product_name, product_price, sku, product_description, qty, img, color, created_at, updated_at) VALUES ('${req.body.product_name}', '${req.body.product_price}', '${req.body.sku}', '${req.body.product_description}', '${req.body.qty}', '${req.body.img}', '${req.body.color}', NOW(), NOW() );`;
        connection.query(sql, function(err, sql_result, fields) {
            if (err) throw err;
            console.log(sql_result.affectedRows + ' record(s) created');
            console.log('what is fields? =>', fields);
            res.json({message: "SUCCESS created new product", success: true});
            });
    },

    // ========== FETCH ALL - GET inventory ===========
    getInventory: (req, res) => {
        console.log('>> SERVER > productController.js > getInventory'.blue);
        console.log("MySQL connected as id ".yellow + connection.threadId);
        var sql = `SELECT id, product_name, product_price, sku, qty, img, color,  DATE_FORMAT(created_at, "%d-%c-%Y, %H:%i") as 'date_created', DATE_FORMAT(updated_at, "%d-%c-%Y, %H:%i") as 'date_updated' FROM UserSQL_DB.products;`;
        connection.query(sql, function(err, sql_result, fields) {
            if (err) throw err;
            console.log(sql_result);
            res.json({sql_result: sql_result});
        });
    },

    // ========== DELETE product ==============
    deleteProduct: (req, res) => {
        console.log('>> SERVER > productController.js > deleteProduct'.blue);
        console.log("MySQL connected as id ".yellow + connection.threadId);
        var sql = `DELETE FROM products WHERE id='${req.params.product_id}'`;
        connection.query(sql, function(err, sql_result, fields) {
            if (err) throw err;
            console.log(sql_result);
            console.log(sql_result.affectedRows + ' record(s) DELETED'.red);
            res.json({message: 'ok delete'});
        });
    }, 

    // =========== GET ONE product ===========
    getOneProduct: (req, res) => {
        console.log('>> SERVER > productController.js > deleteProduct'.blue);
        console.log("MySQL connected as id ".yellow + connection.threadId);
        console.log('req.params.product_id =>'.bgWhite.black, req.params.product_id);
        var sql = `SELECT id, product_name, product_price, product_description, sku, qty, img, color,  DATE_FORMAT(created_at, "%d-%c-%Y, %H:%i") as 'date_created', DATE_FORMAT(updated_at, "%d-%c-%Y, %H:%i") as 'date_updated' FROM products WHERE id='${req.params.product_id}';`;
        connection.query(sql, function(err, sql_result, fields) {
            if (err) throw err;
            console.log(sql_result[0]);
            res.json({message: 'ok getting one obj', res: sql_result[0]})

        })
    },

    // =========== SAVE EDIT ============
    saveEdit: (req, res) => {
        console.log('>> SERVER > productController.js > deleteProduct'.blue);
        console.log("MySQL connected as id ".yellow + connection.threadId);
        console.log('req.params.product_id =>'.bgWhite.black, req.params.product_id);
        var sql = `UPDATE products SET product_name='${req.body.product_name}', product_price='${req.body.product_price}', sku='${req.body.sku}', product_description='${req.body.product_description}', qty='${req.body.qty}', img='${req.body.img}', color='${req.body.color}', updated_at=NOW() WHERE id='${req.params.product_id}'`;
        connection.query(sql, function(err, sql_result, fields) {
            if (err) throw err;
            console.log(sql_result);
            res.json({message: 'OK product successfully updated'});
        });
    },

 // ================== SEARCH ======================
    searchQueryString: (req, res) => {
        console.log('>> SERVER > productController.js > searchQueryString'.blue);
        console.log("MySQL connected as id ".yellow + connection.threadId);
        console.log('req.params.sql_str =>'.bgWhite.black, req.params.sql_str);
        var sql = `SELECT * FROM products WHERE product_name LIKE '%${req.params.sql_str}%';`;
        connection.query(sql, function(err, sql_search_result, fields) {
            if (err) throw err;
            console.log(sql_search_result);
            if (sql_search_result.length > 0) {
                res.json({found: true, res: sql_search_result});
            } else {
                console.log('empty array - no result');
                res.json({found: false, res: ''});
            }
        })

    },

//*****************************************
//***************  ORDERING ***************
//***************************************** 

//----------- id ▲ ascending ----------
    id_asc: (req, res) => {
        var sql = "SELECT * FROM UserSQL_DB.products ORDER BY id;"
        connection.query(sql, function(err, results, fields) {
        if (err) throw err;
            // console.log(results);
            res.json({message: "success retreiving all data ORDER BY ID ASC", order_results: results});
        });
    },
    //----------- id ▼ descending ----------
    id_desc: (req, res) => {
        var sql = "SELECT * FROM UserSQL_DB.products ORDER BY id DESC;"
        connection.query(sql, function(err, results, fields) {
        if (err) throw err;
            // console.log(results);
            res.json({message: "success retreiving all data ORDER BY ID DESC", order_results: results});
        });
    },


    //----------- price ▲ ascending ----------
    price_asc: (req, res) => {
        var sql = "SELECT * FROM UserSQL_DB.products ORDER BY product_price;"
        connection.query(sql, function(err, results, fields) {
        if (err) throw err;
            // console.log(results);
            res.json({message: "success retreiving all data ORDER BY price ASC", order_results: results});
        });
    },
    //----------- price ▼ desc --------------
    price_desc: (req, res) => {
        var sql = "SELECT * FROM UserSQL_DB.products ORDER BY product_price DESC;"
        connection.query(sql, function(err, results, fields) {
        if (err) throw err;
            // console.log(results);
            res.json({message: "success retreiving all data ORDER BY price DESC", order_results: results});
        });
    },


    //----------- QTY ▲ ascending ----------
    qty_asc: (req, res) => {
        var sql = "SELECT * FROM UserSQL_DB.products ORDER BY qty;"
        connection.query(sql, function(err, results, fields) {
        if (err) throw err;
            // console.log(results);
            res.json({message: "success retreiving all data ORDER BY price ASC", order_results: results});
        });
    },
    //----------- QTY ▼ desc --------------
    qty_desc: (req, res) => {
        var sql = "SELECT * FROM UserSQL_DB.products ORDER BY qty DESC;"
        connection.query(sql, function(err, results, fields) {
        if (err) throw err;
            // console.log(results);
            res.json({message: "success retreiving all data ORDER BY price DESC", order_results: results});
        });
    },


    //----------- name ▲ ascending ----------
    name_asc: (req, res) => {
        var sql = "SELECT * FROM UserSQL_DB.products ORDER BY product_name;"
        connection.query(sql, function(err, results, fields) {
        if (err) throw err;
            // console.log(results);
            res.json({message: "success retreiving all data ORDER BY ID ASC", order_results: results});
        });
    },
    //----------- name ▼ ascending ----------
    name_desc: (req, res) => {
        var sql = "SELECT * FROM UserSQL_DB.products ORDER BY product_name DESC;"
        connection.query(sql, function(err, results, fields) {
        if (err) throw err;
            // console.log(results);
            res.json({message: "success retreiving all data ORDER BY ID DESC", order_results: results});
        });
    },









} // -- EOF
