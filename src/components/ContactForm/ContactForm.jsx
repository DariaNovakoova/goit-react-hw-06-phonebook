import { useState } from 'react';
import { nanoid } from 'nanoid';

import styles from './contact-form.module.css';

const INITIAL_STATE = {
  name: '',
  number: '',
};

const ContactForm = ({ onSubmit }) => {
  const [state, setState] = useState({ ...INITIAL_STATE });

  const handleChange = e => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...state });
    reset();
  };

  const reset = () => {
    setState({ ...INITIAL_STATE });
  };

  const nameInputId = nanoid();
  const numberInputId = nanoid();

  const { name, number } = state;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor={nameInputId}>Name</label>
        <input
          type="text"
          name="name"
          value={name}
          id={nameInputId}
          onChange={handleChange}
          placeholder="Name"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor={numberInputId}>Number</label>
        <input
          type="tel"
          name="number"
          value={number}
          id={numberInputId}
          onChange={handleChange}
          placeholder="Number"
          required
        />
      </div>

      <button type="submit">Add contact</button>
    </form>
  );
};

// class ContactForm extends Component {
//   nameInputId = nanoid();
//   numberInputId = nanoid();

//   state = { ...INITIAL_STATE };

//   handleSubmit = e => {
//     e.preventDefault();

//     this.props.onSubmit({ name: this.state.name, number: this.state.number });

//     this.reset();
//   };

//   handleChange = e => {
//     const { name, value } = e.target;
//     this.setState({
//       [name]: value,
//     });
//   };

//   reset() {
//     this.setState({ ...INITIAL_STATE });
//   }

//   render() {
//     const { number, name } = this.state;
//     const { nameInputId, numberInputId, handleSubmit, handleChange } = this;

//     return (
//       <form className={styles.form} onSubmit={handleSubmit}>
//         <div className={styles.formGroup}>
//           <label htmlFor={nameInputId}>Name</label>
//           <input
//             type="text"
//             name="name"
//             value={name}
//             id={nameInputId}
//             onChange={handleChange}
//             placeholder="Name"
//             required
//           />
//         </div>

//         <div className={styles.formGroup}>
//           <label htmlFor={numberInputId}>Number</label>
//           <input
//             type="tel"
//             name="number"
//             value={number}
//             id={numberInputId}
//             onChange={handleChange}
//             placeholder="Number"
//             required
//           />
//         </div>

//         <button type="submit">Add contact</button>
//       </form>
//     );
//   }
// }

export default ContactForm;
