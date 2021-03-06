// var users = require('../controllers/users.js');
// const ctrl = require("./../controllers/userController.js");
const ctrl = require("./../controllers/userController.js");
const prodCtrl = require("./../controllers/productController.js");
const cartCtrl  =require("./../controllers/cartConroller.js")

console.log(">> SERVER > routes.js".blue);

module.exports = function(app) {

// ============ U S E R  routes =============
//======= REGISTER routes ===========
    // Create new user
    app.post("/api/users/new_user", ctrl.newUser);
    // fetch all users
    app.get("/api/users/fetchAll", ctrl.getUsers);

// ======== Login route ============
    // check user 
    app.post("/api/users/checkUser", ctrl.checkUser);

// ======= CHECK SESSION =========
    app.get("/api/users/checkSession", ctrl.checkSession);

// ======= DESTROY SESSION ========
    app.get("/api/users/destroySession", ctrl.destroySession);

//========= CHECK if ADMIN ========
    app.get("/api/users/checkIfAdmin", ctrl.checkIfAdmin);

//========== MAKE ADMIN ==========
    app.get("/api/users/makeAdmin", ctrl.makeAdmin);

//====== Check Who This User Is - Get req.session.id & req.session.fname
    app.get("/api/users/checkWhoThisUserIs", ctrl.checkWhoThisUserIs)

//---------------- search --------------
app.get("/api/users/search/:sql_str", ctrl.searchQueryString);


//================ PRODUCT ROUTES =================

// create new product
    app.post("/api/product/create", prodCtrl.createProduct);
// fetch aLL - get inventory
    app.get("/api/product/getInventory", prodCtrl.getInventory);
// DELETE product
    app.delete("/api/product/:product_id/delete", prodCtrl.deleteProduct);
// GET ONE from param id
    app.get("/api/product/:product_id/edit", prodCtrl.getOneProduct);
// UPDATE ONE (PUT)
    app.put("/api/product/:product_id/saveEdit", prodCtrl.saveEdit);



//---------------- search --------------
    app.get("/api/product/search/:sql_str", prodCtrl.searchQueryString);




    // ************* PRODUCT ordering *************-
    // --------- id ▲ asc ------------
    app.get("/api/product/id_asc", prodCtrl.id_asc);
    // --------- id ▼ desc -----------
    app.get("/api/product/id_desc", prodCtrl.id_desc);
    
    // --------- price ▲ asc --------
    app.get("/api/product/price_asc", prodCtrl.price_asc);
    // -------- price ▼ desc -------
    app.get("/api/product/price_desc", prodCtrl.price_desc);

    // -------- qty ▲ asc ----------
    app.get("/api/product/qty_asc", prodCtrl.qty_asc);
    // -------- qty ▼ desc ----------
    app.get("/api/product/qty_desc", prodCtrl.qty_desc);

    // --------- name ▲ asc ------------
    app.get("/api/product/name_asc", prodCtrl.name_asc);
    // --------- name ▼ desc ----------
    app.get("/api/product/name_desc", prodCtrl.name_desc);




    // ************* USER ordering *************-
    // --------- id ▲ asc ------------
    app.get("/api/users/id_asc", ctrl.id_asc);
    // --------- id ▼ desc -----------
    app.get("/api/users/id_desc", ctrl.id_desc);    
    // --------- fname ▲ asc --------
    app.get("/api/users/fname_asc", ctrl.fname_asc);
    // -------- fname ▼ desc -------
    app.get("/api/users/fname_desc", ctrl.fname_desc);
    // --------- lname ▲ asc --------
    app.get("/api/users/lname_asc", ctrl.lname_asc);
    // -------- lname ▼ desc -------
    app.get("/api/users/lname_desc", ctrl.lname_desc);
    // -------- email ▲ asc ----------
    app.get("/api/users/email_asc", ctrl.email_asc);
    // -------- email ▼ desc ----------
    app.get("/api/users/email_desc", ctrl.email_desc);
    // --------- created ▲ asc ------------
    app.get("/api/users/created_asc", ctrl.created_asc);
    // --------- created ▼ desc ----------
    app.get("/api/users/created_desc", ctrl.created_desc);
    // --------- updated ▲ asc ------------
    app.get("/api/users/updated_asc", ctrl.updated_asc);
    // --------- updated ▼ desc ----------
    app.get("/api/users/updated_desc", ctrl.updated_desc);


// ============= DATA ROUTES =======================
// ----------- Add cart Item To Session ------------
    app.post("/api/session/updateCartItemToSession", cartCtrl.updateCartItemToSession);

//----------- Get All Cart Items ------------------
    app.get("/api/product/getAllCartItems", cartCtrl.getAllCartItems);
// --------- Clear Cart Session -------------------
    app.get("/api/product/clearCartSession", cartCtrl.clearCartSession);

// ------ Remove Item From Cart Session ---------
    app.get("/api/cart/:cartItemId/remove", cartCtrl.removeItemFromCartSession);



} // -- EOF

