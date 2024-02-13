import { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const data = JSON.parse(localStorage.getItem('contactsList'));
    return data || [];
  });
  const [filter, setFilter] = useState('');

  const firstRender = useRef(true);

  useEffect(() => {
    if (!firstRender.current) {
      localStorage.setItem('contactsList', JSON.stringify(contacts));
    }
  }, [contacts]);

  useEffect(() => {
    firstRender.current = false;
  }, []);

  const addContact = contact => {
    const ourContacts = contacts.some(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );

    if (ourContacts) {
      return alert(`${contact.name} is already in contacts`);
    }

    setContacts(prevContacts => {
      const newContact = {
        id: nanoid(),
        ...contact,
      };

      return [...prevContacts, newContact];
    });
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(({ id }) => id !== contactId)
    );
  };

  const changeFilter = e => setFilter(e.target.value);

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const items = getFilteredContacts();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '33',
        margin: '0 auto',
        height: 'auto',
        width: '850px',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />

      <h2>Contacts</h2>
      {contacts.length > 0 ? (
        <Filter value={filter} changeFilter={changeFilter} />
      ) : (
        <div
          style={{
            flexWrap: 'wrap',
            gap: '10',
            justifyContent: 'space-around',
          }}
        >
          Your phonebook is empty. Add first contact!
        </div>
      )}

      {contacts.length > 0 && (
        <ContactList contacts={items} deleteContact={deleteContact} />
      )}
    </div>
  );
};

// class App extends Component {
//   state = {
//     contacts: [
//       // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       // { id: 'id-2', name: 'Hermiona Kline', number: '443-89-12' },
//       // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };

//   componentDidMount() {
//     const contacts = JSON.parse(localStorage.getItem('contactsList'));
//     if (contacts?.length) {
//       this.setState({
//         contacts,
//       });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const { contacts } = this.state;

//     if (prevState.contacts.length !== contacts.length) {
//       localStorage.setItem('contactsList', JSON.stringify(contacts));
//     }
//   }

//   addContact = contact => {
//     const ourContacts = this.state.contacts.some(
//       ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
//     );

//     if (ourContacts) {
//       return alert(`${contact.name} is already in contacts`);
//     }

//     this.setState(prevState => ({
//       contacts: [{ id: nanoid(), ...contact }, ...prevState.contacts],
//     }));
//   };

//   deleteContact = contactId => {
//     this.setState(prevState => {
//       return {
//         contacts: prevState.contacts.filter(({ id }) => id !== contactId),
//       };
//     });
//   };

//   changeFilter = e => {
//     this.setState({ filter: e.target.value });
//   };

//   getFilteredContacts = () => {
//     const { contacts, filter } = this.state;
//     const normalizedFilter = filter.toLowerCase();

//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter)
//     );
//   };

//   render() {
//     const { addContact, deleteContact, changeFilter } = this;
//     const { filter } = this.state;
//     const contacts = this.getFilteredContacts();

//     return (
//       <div
//         style={{
//           display: 'flex',
//           flexDirection: 'column',
//           padding: '33',
//           margin: '0 auto',
//           height: 'auto',
//           width: '850px',
//         }}
//       >
//         <h1>Phonebook</h1>
//         <ContactForm onSubmit={addContact} />

//         <h2>Contacts</h2>
//         {this.state.contacts.length > 0 ? (
//           <Filter value={filter} changeFilter={changeFilter} />
//         ) : (
//           <div
//             style={{
//               flexWrap: 'wrap',
//               gap: '10',
//               justifyContent: 'space-around',
//             }}
//           >
//             Your phonebook is empty. Add first contact!
//           </div>
//         )}

//         {this.state.contacts.length > 0 && (
//           <ContactList contacts={contacts} deleteContact={deleteContact} />
//         )}
//       </div>
//     );
//   }
// }

export default App;
