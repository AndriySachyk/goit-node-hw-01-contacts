const { nanoid } = require("nanoid");

const fs = require('fs/promises');
const path = require('path');


const contactsPath = path.join(__dirname, "db", "contacts.json");


const listContacts = async()=> {
  const contacts = await fs.readFile(contactsPath)
  return  JSON.parse(contacts)
  
}



  const getContactById = async (id) => {
    const contacts = await listContacts()
    const contactById = contacts.find((contact)=> contact.id === id)
    return contactById || null
  }
  
  const removeContact = async (id) => {
    const contacts = await listContacts()
    const indexRemove = contacts.findIndex((contact)=> contact.id === id)
    if (indexRemove === -1) {
      return null
    }
    const newContacts = contacts.splice(indexRemove, 1);
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return newContacts
  }
  
  
const addContact = async (data)=> {
    const contacts = await listContacts()
    const newContact = {
      id: nanoid(),
     ...data
    }  
    contacts.push(newContact)
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return newContact
}


  module.exports = {
    listContacts, 
    addContact, 
    removeContact, 
    getContactById
  }


