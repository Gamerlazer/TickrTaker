var Sequelize = require('sequelize');
var db = new Sequelize('postgres://ubuntu:password@localhost:5432/tickr');
var moment = require('moment');

//  Get controllers for users, items, bids.

var UserController = require('./UserController')(db, Sequelize);
var ItemController = require('./ItemController')(db, Sequelize, UserController.User);
var BidController = require('./BidController')(db, Sequelize, UserController.User, ItemController.Item);

//  Assign many-to-one relationships between items-seller, bids-item, and bids-bidder.

//  NOT IMPLEMENTED: Join tables to make querying for multiple items substantially easier.

//  Ideally we would have a user-item-highestBid join table that would allow for cleaner queries.

UserController.User.hasMany(ItemController.Item, {as: 'Items', onDelete: 'cascade'});
ItemController.Item.belongsTo(UserController.User, {as: 'Seller'});

ItemController.Item.hasMany(BidController.Bid, {as: 'Bids', onDelete: 'cascade'});
BidController.Bid.belongsTo(ItemController.Item, {as: 'Item'});

UserController.User.hasMany(BidController.Bid, {as: 'Bids', onDelete: 'cascade'});
BidController.Bid.belongsTo(UserController.User, {as: 'Bidder'});


//DUMMY DATA. Drops tables every time server restarts.

db.sync({force: true})
.then(function() {
  UserController.User.create({
    firstName: 'Alexander',
    lastName: 'Pantelides',
    id: '10154095627189811',
    email: 'voracious.scroll@gmail.com',
    photo: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/11148734_10205233811059304_8200092159283226084_n.jpg?oh=a19a83eef9251ff118ccb61e0b1069df&oe=583F7305'
  }).then(function(lex) {
    UserController.User.create({
      firstName: 'Kunal',
      lastName: 'Rathi',
      id: '10206128224638462',
      email: 'voracious.scroll@gmail.com',
    })
    .then(function(seller) {
      ItemController.Item.create({
        title: 'Monkey',
        description: 'A monkey!',
        picture: 'http://res.cloudinary.com/dijpyi6ze/image/upload/v1473717678/item_photos/ddvlpupgnrur0l7nm3ng.jpg',
        startPrice: 10000.00,
        endPrice: 100.00,
        endDate: '2016-09-13T00:00Z',
        auctionEndDateByHighestBid: '2016-09-13T00:00Z'
      }).then(function (item) {
        lex.addItem(item);
      });
      ItemController.Item.create({
        title: 'Fluorescent',
        description: 'Some glow sticks!',
        picture: 'http://res.cloudinary.com/dijpyi6ze/image/upload/v1473717852/item_photos/vx7mzeluumrn1qngrnia.jpg',
        startPrice: 10000000.00,
        endPrice: 1.00,
        endDate: '2016-09-20T17:00Z',
        auctionEndDateByHighestBid: '2016-09-20T17:00Z'
      }).then(function (item) {
        seller.addItem(item);
      });
      ItemController.Item.create({
        title: 'Linguine',
        description: 'Some linguine!',
        picture: 'http://res.cloudinary.com/dijpyi6ze/image/upload/v1473717931/item_photos/dsnyockmsy6enburpyjt.png',
        startPrice: 10000000.00,
        endPrice: 1000000.00
      }).then(function (item) {
        seller.addItem(item);
      });
      ItemController.Item.create({
        title: 'Cavs vs Warriors - Game 7 tickets - Row A Seat 1 - 10',
        description: 'Some tickets! Get the perfect seats for the NBA finals game 7!',
        picture: 'http://res.cloudinary.com/dijpyi6ze/image/upload/v1473718163/item_photos/sxyqw1yolsfbvzdkvhjr.png',
        startPrice: 20000.00,
        endPrice: 1000.00
      }).then(function (item) {
        seller.addItem(item);
      });
      ItemController.Item.create({
        title: 'Full bed',
        description: 'Slip into a luxurious Voracious Scroll bed, custom designed for Voracious Scroll hotels, and have your best sleep every night. The Voracious Scroll Mattress & Box Spring is designed with extra coil support and features a unique internal design that prevents edge breakdown. The innovative, patented quilt design and plush top mattress improves circulation and reduces night time restlessness. Feel even more rested by accompanying your Voracious Scroll bed with Voracious Scroll linens, available in variety of thread counts and fabrications that will complete your bed essentials. Make sleep a priority with the Voracious Scroll Bed.',
        picture: "https://i.ytimg.com/vi/tdY85uOeCa4/maxresdefault.jpg",
        // original low res pic:
        // picture: 'http://res.cloudinary.com/dijpyi6ze/image/upload/v1473717788/item_photos/wqifur3lxghuzoysy8c2.jpg',
        // to add: http://images.cb2.com/is/image/CB2/DondraBedQueenAV1F12/$web_zoom_furn_colormap$/160914115850/DondraBedQueenAV1F12.jpg, http://images.cb2.com/is/image/CB2/DondraBedQueenAV3F12/$web_zoom_furn_colormap$/160914115850/DondraBedQueenAV3F12.jpg, http://images.cb2.com/is/image/CB2/DondraBedQueenF12/$web_zoom_furn_colormap$/130830204135/dondra-bed.jpg
        startPrice: 999.00,
        endPrice: 1.00
      })
      .then(function(item) {
        seller.addItem(item);
        console.log('CREATED ITEM');
        UserController.User.find({where: {id: '10206128224638462'}})
        .then(function(bidder) {
          BidController.Bid.create({
            price: 600.00
          }).then(function(bid) {
            item.addBid(bid);
            lex.addBid(bid);
          });
          BidController.Bid.create({
            price: 495.95
          })
          .then(function(bid) {
            item.addBid(bid).then(function(item) {
            });
            bidder.addBid(bid);
          });
        });
      });
    });
  });
});

module.exports = {
  db: db,
  UserController: UserController,
  ItemController: ItemController,
  BidController: BidController
};
