import { program } from "commander";

import {
  getContacts,
  getContactById,
  addContact,
  removeContact,
} from "./contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      console.log("Action list, calling a function listContacts");

      const list = await getContacts();
      return console.table(list);

    case "get":
      console.log("Action get, calling a function getContactById");

      const contact = await getContactById(id);
      return console.log(contact);
     

    case "add":
      console.log("Action add, calling a function addContact");

      const newContact = await addContact(name, email, phone);
      return console.log("newContact", newContact);
    

    case "remove":
      console.log("Action remove, calling a function removeContact");
      
      const delContact = await removeContact(id);
      return console.log(delContact);

    default:
      console.warn("Unknown action type!");
  }
};

invokeAction(argv);
