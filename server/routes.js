// var db = require('./db/index.js');

module.exports = (app, db) => {
  //USERS ENDPOINT

  // app.post('/signup', (req, res) => {
  //   db.UserController.addUser(req, res, req.body);
  // });

  // app.post('/signin', (req, res) => {
  //   db.UserController.logIn(req, res, req.body);
  // });

  app.put('/users', (req, res) => {
    db.UserController.updateUser(req, res, req.body);
  });

  //ITEMS ENDPOINT
  app.get('/api/singleItem/:itemId', (req, res, next) => {
    db.ItemController.getOneItem(req, res, next, req.params.itemId);
  });

  app.put('/api/singleItem/:itemId', (req, res, next) => {
    console.log(req.params.itemId, 'REQUETSSSSSS         ************************ ENDPOINT' );
    db.ItemController.expiredItem(req, res, next);
  });

  app.get('/api/items/bids/:itemId', (req, res, next) => {
    db.BidController.getBidsForItem(req, res, next, req.params.itemId);
  });

  app.post('/api/items/bids/:itemId', (req, res, next) => {
    db.BidController.putBidOnItem(req, res, next, req.params.itemId);
    // res.send('POST /api/bids');
  });

  app.delete('/api/items/bids/:itemId', (req, res, next) => {
    db.BidController.removeBidFromItem(req, res, next, req.params.itemId);
    // res.send('DELETE /api/bids');
  });

  app.get('/api/allitems', (req, res, next) => {
    db.ItemController.getAllItems(req, res, next);
  });

  app.get('/api/selleritems', (req, res, next) => {
    db.ItemController.getItemsForSale(req, res, next);
    // res.send('GET /api/items');
  });

  app.get('/api/oldselleritems', (req, res, next) => {
    console.log('SELLER ID @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', req.user.dataValues.id);
    db.ItemController.getOldItemsForSale(req, res, next);
  });

  app.post('/api/items', (req, res) => {
    db.ItemController.putItemForSale(req, res);
    // res.send('POST /api/items');
  });

  app.delete('/api/items', (req, res, next) => {
    db.ItemController.removeItemFromSale(req, res, next);
  });

  //BIDS ENDPOINT

  app.get('/api/bids', (req, res, next) => {
    console.log('***************', req.user.dataValues.id);
    db.BidController.getBidsForSeller(req, res, next);
  });

  app.post('/api/oldbids', (req, res, next) => {
    db.BidController.getOldBidsForSeller(req, res, next);
  });

  app.get('/api/user_data', function(req, res) {
    if (req.user === undefined) {
      res.json({});
    } else {
      res.json({
        user: req.user
      });
    }
  });

  app.get('/api/profile/:id', function(req, res) {
    var authenticated = req.user ? true : false;
    db.UserController.getProfile(req, res, authenticated);
  });

  app.post('/api/account/aboutMe/', function(req, res) {
    var authenticated = req.user ? true : false;
    db.UserController.saveAboutMe(req, res, authenticated);
  });

};
