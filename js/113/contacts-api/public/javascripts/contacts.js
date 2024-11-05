/*globals $, pcs, io*/
(function () {
  'use strict';

  let contacts = [];

  const contactsTable = $('#contactsTable tbody');
  const firstNameInput = $('#first');
  const lastNameInput = $('#last');
  const emailInput = $('#email');
  const phoneInput = $('#phone');
  const contactForm = $('#contactForm');

  function showContactForm(contact) {
    if (contact) {
      firstNameInput.val(contact.first);
      lastNameInput.val(contact.last);
      emailInput.val(contact.email);
      phoneInput.val(contact.phone);

      contactForm.data('contact', contact);
    }

    contactForm.slideDown('fast');
  }

  $('#addContact').click(() => {
    showContactForm();
  });

  function updateContact(existingContact) {
    const tds = existingContact.row.find('td');
    tds[0].textContent = existingContact.first;
    tds[1].textContent = existingContact.last;
    tds[2].textContent = existingContact.email;
    tds[3].textContent = existingContact.phone;
  }

  function deleteContact(contact) {
    contact.row.remove();
    contacts = contacts.filter(c => c !== contact);
    if (!contacts.length) {
      contactsTable.append('<tr><td colspan="5">no contacts loaded</td><tr>');
    }
  }

  function addContact(newContact) {
    if (!contacts.length) {
      contactsTable.empty();
    }
    contacts.push(newContact);

    const row = $(`<tr>
        <td>${newContact.first}</td>
        <td>${newContact.last}</td>
        <td>${newContact.email}</td>
        <td>${newContact.phone}</td>
        <td>
          <button class="edit">edit</button>
          <button class="delete">delete</button>
        </td>
      </tr>`)
      .appendTo(contactsTable);

    newContact.row = row;

    row.find('.delete')
      .click(async () => {
        try {
          const response = await fetch(
            `/contacts-api/${newContact.id}`,
            {
              method: 'DELETE'
            }
          );

          if (!response.ok) {
            const msg = await response.text();
            throw new Error(`${response.status} ${response.statusText} - ${msg}`);
          }

          deleteContact(newContact);
        } catch (e) {
          pcs.messageBox(e.message);
        }
      });

    row.find('.edit')
      .click(async () => {
        showContactForm(newContact);
      });
  }

  contactForm.submit(async e => {
    e.preventDefault();

    const newContact = {
      first: firstNameInput.val(),
      last: lastNameInput.val(),
      email: emailInput.val(),
      phone: phoneInput.val()
    };

    let url = '/contacts-api/';
    const existingContact = contactForm.data('contact');
    if (existingContact) {
      url += existingContact.id;
    }
    try {
      const response = await fetch(
        url,
        {
          method: existingContact ? 'PUT' : 'POST',
          body: JSON.stringify(newContact),
          headers: {
            'content-type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        const msg = await response.text();
        throw new Error(`${response.status} ${response.statusText} - ${msg}`);
      }

      if (!existingContact) {
        //const addedContact = await response.json();
        //addContact(addedContact);
      } else {
        Object.assign(existingContact, newContact);
        updateContact(existingContact);
      }

      hideContactForm();
    } catch (e) {
      pcs.messageBox(e.message);
    }
  });

  function hideContactForm() {
    contactForm.slideUp('slow');

    // contactForm[0].reset();
    contactForm.trigger('reset');
  }

  document.querySelector('#cancel').addEventListener('click', () => {
    hideContactForm();
  });

  async function loadContacts() {
    try {
      const response = await fetch('/contacts-api/');
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const loadedContacts = await response.json();

      const deletedContacts = contacts.filter(c => !loadedContacts.find(lc => lc.id === c.id));
      deletedContacts.forEach(dc => deleteContact(dc));

      loadedContacts.forEach(contact => {
        const existingContact = contacts.find(c => c.id === contact.id);
        if (existingContact) {
          Object.assign(existingContact, contact);
          updateContact(existingContact);
        } else {
          addContact(contact);
        }
      });

    } catch (e) {
      pcs.messageBox(e.message);
    }
  }

  loadContacts();

  const socketIo = io();
  socketIo.on('add', contact => {
    console.log('got add', contact);
    addContact(contact);
  });

  socketIo.on('update', contact => {
    console.log('got update', contact);

    const existingContact = contacts.find(c => c.id === contact.id);
    if (existingContact) {
      Object.assign(existingContact, contact);
      updateContact(existingContact);
    }
  });

  socketIo.on('delete', contactId => {
    console.log('got delete', contactId);

    const contact = contacts.find(c => c.id === contactId);
    deleteContact(contact);
  });
}());
