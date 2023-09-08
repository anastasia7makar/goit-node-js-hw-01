import { nanoid } from "nanoid";

import fs from "fs/promises";
import path from "path";

const contactsPath = path.resolve("./db/contacts.json");
console.log(contactsPath);

const getContacts = async () => {
  const data = await fs.readFile(contactsPath, { encoding: "utf8" });
  const contactsList = JSON.parse(data);
  return contactsList;
};

const getContactById = async (contactId) => {
  const contactsList = await getContacts();
  const contactById = contactsList.find((contact) => contact.id === contactId);
  return contactById || null;
};

const removeContact = async (contactId) => {
  const contactsList = await getContacts();
  const index = contactsList.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [delContact] = contactsList.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return delContact;
};

const addContact = async (name, email, phone) => {
  const newContact = {
    id: nanoid(),
    name: name,
    email: email,
    phone: phone,
  };
  const contactsList = await getContacts();

  contactsList.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return newContact;
};

export { getContacts, getContactById, removeContact, addContact };
