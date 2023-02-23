const contacts = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, phone, email }) {
  switch (action) {
    case "list":
      const contactList = contacts.listContacts();
      return console.log(contactList);

    case "get":
      const contact = contacts.getContactById(id);
      return console.log(contact);

    case "add":
      const newContact = contacts.addContact({ name, email, phone });
      return console.log(newContact);

    case "remove":
      const removingContact = contacts.removeContact(id);
      return console.log(removingContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
