import { Command } from "commander";
import { addContact, getContactById, listContacts, removeContact } from "./db/contacts.js";


const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');
  program.parse();
const invokeAction = async ({action, id, ...data})=> {
    switch(action) {
        case "list":
           const allContacts = await listContacts();
           return console.log(allContacts);
        case "get":
            const contact = await  getContactById(id);
            return console.log(contact);
        case "add":
            const newContact = await addContact(data);
            return console.log(newContact);
        case "remove":
            const removedContact = await removeContact(id);
            return console.log(removedContact);
        default:
      console.warn('\x1B[31m Unknown action type!');
    }
}

const options = program.opts();
invokeAction(options);