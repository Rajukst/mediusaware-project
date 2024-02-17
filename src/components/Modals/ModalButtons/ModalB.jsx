import React, { useEffect, useState, useRef } from 'react';
import "../ModalCSS/Modal.css"
import ContactDetailsModal from './ContactDetailsModal';


const ModalB = ({ closeModalB }) => {
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [showEvenOnly, setShowEvenOnly] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);
    const [showContactDetailsModal, setShowContactDetailsModal] = useState(false);
    const observer = useRef();

    useEffect(() => {
        setLoading(true);
        fetchContacts();

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [page]);

    useEffect(() => {
        if (!hasMore) return;

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setPage(prevPage => prevPage + 1);
            }
        });

        if (loading) return;

        observer.current.observe(document.querySelector(".endOfContacts"));

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [loading, hasMore]);

    useEffect(() => {
        setFilteredContacts(contacts.filter(contact => {
            const normalizedQuery = searchQuery.toLowerCase();
            return contact.phone.toLowerCase().includes(normalizedQuery);
        }));
    }, [searchQuery, contacts]);

    useEffect(() => {
        if (showEvenOnly) {
            setFilteredContacts(prevFilteredContacts => prevFilteredContacts.filter((_, index) => index % 2 === 0));
        } else {
            setFilteredContacts(contacts.filter(contact => {
                const normalizedQuery = searchQuery.toLowerCase();
                return contact.phone.toLowerCase().includes(normalizedQuery);
            }));
        }
    }, [showEvenOnly, contacts, searchQuery]);
    
    const fetchContacts = async () => {
        try {
            const response = await fetch(`https://contact.mediusware.com/api/contacts/?page=${page}&page_size=20`);
            const data = await response.json();
            const newContacts = data.results;
            if (newContacts.length === 0) {
                setHasMore(false);
                setLoading(false);
                return;
            }
            setContacts(prevContacts => [...prevContacts, ...newContacts]);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching contacts:', error);
            setLoading(false);
        }
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleFilter = (filter) => {
        setPage(1);
        setSearchQuery('');
        setLoading(true);
        setFilteredContacts([]);
        switch (filter) {
            case 'all':
                setFilteredContacts(contacts);
                break;
            case 'us':
                setFilteredContacts(contacts.filter(contact => contact.country.name === 'United States'));
                break;
            default:
                setFilteredContacts(contacts);
        }
    };
    const openContactDetailsModal = (contact) => {
        setSelectedContact(contact);
        setShowContactDetailsModal(true);
    };

    const closeContactDetailsModal = () => {
        setShowContactDetailsModal(false);
    };

    return (
        <>
            <div className="modalBackground">
                <div className="modalContainer">
                    <div className="title">
                        <h1>Modal A</h1>
                    </div>
                    <div className="modalTitles">
                        <div className="footer">
                            <button className='modalButtonA' onClick={() => handleFilter('all')}>All Contacts</button>
                            <button className='modalButtonB' onClick={() => handleFilter('us')}>US Contacts</button>
                            <button onClick={() => closeModalB(false)} className='modalButtonC'>Close</button>
                        </div>
                        <div className="evenOnly">
                        <input
                            type="checkbox"
                            id="even-only"
                            name="even"
                            value="evenonly"
                            checked={showEvenOnly}
                            onChange={(e) => setShowEvenOnly(e.target.checked)}
                        />
                        <label htmlFor="even">Even Only</label>
                        </div>
                    </div>
                    <div className="searchOptions mt-3">
                        <input type="text" name="" id="" placeholder='Search Anything' value={searchQuery} onChange={(e) => handleSearch(e.target.value)} />
                    </div>
                    <div className="body">
                        <table>
                            <thead>
                                <tr>
                                    <th>Sl No</th>
                                    <th>Contacts</th>
                                    <th>Country</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredContacts.map((contact, index) => (
                                   <tr key={index + 1} onClick={() => openContactDetailsModal(contact)}>
                                        <td>{showEvenOnly ? (index + 1) * 2 : index + 1}</td>
                                        <td>{contact.phone}</td>
                                        <td>{contact.country.name}</td>
                                    </tr>
                                ))}
                                {loading && <tr><td colSpan="3">Loading...</td></tr>}
                                {!loading && hasMore && <tr><td colSpan="3" className="endOfContacts">Scroll to load more</td></tr>}
                                {!loading && !hasMore && <tr><td colSpan="3">No more contacts to load</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {showContactDetailsModal && <ContactDetailsModal contact={selectedContact} closeModal={closeContactDetailsModal} />}
        </>
    );
};

export default ModalB;
