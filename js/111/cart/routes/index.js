var express = require('express');
var router = express.Router();
const items = require('../items.js');
const Cart = require('../cart.js')


/* GET home page. */
router.route('/') 
  .get(function(req, res, next) {
    res.render('layout', {
      title: 'Albums',
      items,
      partials: {
        content: 'index'
      }
   });
  })
  .post((req, res, next) => {
  const { id, quantity } = req.body;

  const cart = new Cart( req.session.cart?.items);
  cart.addItem(id, quantity);
    
    res.redirect('/');
});

router.get('/viewCart', (req, res, next) => {
  res.render('layout', {
    items: req.session.cart?.items,
    partials: {
      content: 'viewCart'
    }
  })
});

module.exports = router;
