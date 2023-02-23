const fs = require("fs");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

console.log(contactsPath);

function listContacts() {
  const data = fs.readFileSync(contactsPath, "utf-8");
  return JSON.parse(data);
}

function getContactById(id) {
  const contacts = listContacts();
  const result = contacts.find((item) => item.id === id);
  if (!result) {
    throw new Error("Not found");
  }
  return result;
}

function addContact({ name, email, phone }) {
  const contacts = listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);
  fs.writeFileSync(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

function removeContact(id) {
  const contacts = listContacts();
  const result = contacts.find((item) => item.id === id);
  if (!result) {
    throw new Error("Not found");
  }
  const removed = contacts.splice(contacts.indexOf(result), 1);
  fs.writeFileSync(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
