import { useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
import ContactItem from 'components/ContactList/ContactItem/ContactItem';
import Notification from 'components/Notification/Notification';
import { List, ListItem } from './ContactList.styled';

const ContactList = () => {
	const contacts = useSelector(getContacts);
	const filter = useSelector(getFilter);
	const filteredContacts = contacts.filter(({ contactName }) =>
		contactName.toLowerCase().includes(filter)
	);
	const areContacts = Boolean(filteredContacts.length);

	const listItems = filteredContacts.map(contact => {
		return (
			<ListItem key={contact.id}>
				<ContactItem contact={contact} aria-label="Delete contact" />
			</ListItem>
		);
	});

	return (
		<>
			{!areContacts && (
				<Notification message="There is no contact with such name." />
			)}
			{areContacts && <List>{listItems}</List>}
		</>
	);
};

export default ContactList;
