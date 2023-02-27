import PropTypes from 'prop-types';
import { initialAddContactFormValues } from 'initials/initialAddContactFormValues';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts } from 'redux/selectors';
import { addContact } from 'redux/contactsSlice';
import { TiUserAddOutline } from 'react-icons/ti';
import {
	loadDataFromLocalSt,
	saveDataToLocalSt,
	localStorageFormValuesKey,
} from 'helpers/localStfunc';
import { getContactPropertyValues } from 'helpers/getContactPropertyValues';
import { Form, Label, Input, SubmitBtn } from './ContactForm.styled';

const ContactForm = ({ toggleModal }) => {
	const [formValues, setFormValues] = useState(
		() =>
			loadDataFromLocalSt(localStorageFormValuesKey) ?? initialAddContactFormValues
	);
	const contacts = useSelector(getContacts);
	const dispatch = useDispatch();
	const myGroups = getContactPropertyValues(
		useSelector,
		getContacts,
		'contactsGroup'
	);

	useEffect(() => {
		saveDataToLocalSt(localStorageFormValuesKey, formValues);
	}, [formValues]);

	const handleInputChange = ({ target: { name, value } }) => {
		if (name === 'contactsGroupList') {
			return (
				!formValues['contactsGroup'] &&
				setFormValues(prevState => ({ ...prevState, contactsGroup: value }))
			);
		}

		setFormValues(prevState => ({ ...prevState, [name]: value }));
	};

	const onFormSubmit = event => {
		event.preventDefault();

		const result = contacts.some(
			({ contactName }) => contactName === formValues.contactName
		);

		if (!result) {
			toggleModal();
			dispatch(addContact(formValues));
			saveDataToLocalSt(localStorageFormValuesKey, initialAddContactFormValues);
		} else {
			alert('Contact with such names is already in your phone book.');
		}
	};

	const { contactName, contactPhoneNumber, contactsGroup } = formValues;

	return (
		<Form onSubmit={onFormSubmit}>
			<Label>
				Name
				<Input
					onChange={handleInputChange}
					type="text"
					name="contactName"
					pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
					title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
					value={contactName}
					required
				/>
			</Label>

			<Label>
				Number
				<Input
					onChange={handleInputChange}
					type="tel"
					name="contactPhoneNumber"
					pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
					title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
					value={contactPhoneNumber}
					required
				/>
			</Label>
			<Label>
				Enter the name of the group to which you want to attach a contact:
				<Input
					onChange={handleInputChange}
					type="text"
					name="contactsGroup"
					pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
					value={contactsGroup}
				/>
			</Label>
			<Label>
				or choose from the list:
				<select
					onChange={handleInputChange}
					name="contactsGroupList"
					defaultValue="---"
					disabled={formValues.contactsGroup ? true : false}
				>
					{myGroups.map(group => (
						<option key={group} value={group}>
							{group}
						</option>
					))}
				</select>
			</Label>
			<SubmitBtn type="submit">
				<TiUserAddOutline style={{ fontSize: 14 }} />
				Add contact
			</SubmitBtn>
		</Form>
	);
};

ContactForm.propTypes = {
	toggleModal: PropTypes.func.isRequired,
};

export default ContactForm;
