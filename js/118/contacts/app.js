import mongoose from 'mongoose';
import Contact from './Contact.js';
import ContactList from './ContactList.js';

await mongoose.connect('mongodb://127.0.0.1:27017/contacts');

const joe = new Contact({
  name: 'Joe Biden',
  phone: '1234567890'
});

await joe.save();

const contactList1 = new ContactList({
  name: 'Coworkers'
});

const contactList2 = new ContactList({
  name: 'Friends'
});

contactList1.contacts.push(joe);
contactList2.contacts.push(joe);

contactList1.print();
contactList2.print();

await contactList1.save();
await contactList2.save();

const reloadedContactList1 = await ContactList.findOne({name: 'Coworkers'});
const reloadedContactList2 = await ContactList.findOne({ name: 'Friends' });

reloadedContactList1.print();
reloadedContactList2.print();

const reconstitutedLists = await ContactList.find().populate('contacts').exec();
reconstitutedLists[0].contacts[0].name = 'Kamala Harris';
reconstitutedLists.forEach(cl => cl.print());
