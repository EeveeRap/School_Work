var express = require('express');
var router = express.Router();

let contacts = [
  {
    id: 1,
    first: 'Joe',
    last: 'Biden',
    email: 'jbiden@whitehouse.gov',
    phone: '123456789'
  },
  {
    id: 2,
    first: 'Kamala',
    last: 'Harris',
    email: 'kharris@whitehouse.gov',
    phone: '987654321'
  }
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('layout', {
    title: 'Express',
    partials: {
      content: 'index'
    },
    contacts,
    noContacts: contacts?.length === 0
  });
});

router.get('/addContact', function (req, res, next) {
  res.render('layout', {
    title: 'Express',
    partials: {
      content: 'addContact'
    }
  });
});

router.post('/addContact', function (req, res, next) {

  //generating a new ID for every contact that is made:
  let newId = contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 1;

  //attaching the ID to the new contact object:
  let newContact = {
    id: newId,
    first: req.body.first,
    last: req.body.last,
    email: req.body.email,
    phone: req.body.phone
  };
  contacts.push(newContact);
  
  



  res.writeHead(301, {'location': '/'});
  res.end();
});

router.get('/delete/:id', function (req, res, next) {
  contacts = contacts.filter(c => c.id !== Number(req.params.id));

  res.writeHead(301, { 'location': '/' });
  res.end();
});

router.get('/editContact/:id', function (req, res, next) {
//finding the specific contact selected based on ID:
  let contactToEdit = contacts.find(c => c.id === Number(req.params.id));

  res.render('layout', {
    title: 'Express',
    partials: {
      content: 'editContact'
    },
    contact: contactToEdit
  });
});

router.post('/editContact/:id', function (req, res, next) {

  //pulling the ID out of the params:
  let contactId = Number(req.params.id);

  //checking each spot in the contacts array and trying to find the index of the contact whose ID matches our current contact ID:
  let index = contacts.findIndex(c => c.id === contactId);
 
  if (index !== -1){
    contacts[index].first = req.body.first;
    contacts[index].last = req.body.last;
    contacts[index].email = req.body.email;
    contacts[index].phone = req.body.phone;
  }

  res.writeHead(301, {'location': '/'});
  res.end();
});

module.exports = router;
