import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListContacts extends Component {
  static PropTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({query: query.trim()});
  }

  clearQuery = () => {
    this.setState({query: ''});
  }

  render() {
    const { onDeleteContact, contacts } = this.props;
    const { query } = this.state;
    let visibleContacts;

    if(query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      visibleContacts = contacts.filter((c)=>match.test(c.name));
    } else {
      visibleContacts = contacts;
    }

    visibleContacts.sort(sortBy('name'));

    return (
      <div className='list-contacts'>
        <div className='list-contacts-top'>
          <input
            className='search-contacts'
            value= {query}
            type='text'
            placeholder='Search Contacts'
            onChange={(ev)=>this.updateQuery(ev.target.value)}
          />
          <Link
            to="/create"
            className='add-contact'
          > Add Contact </Link>

        </div>
        {visibleContacts.length !== contacts.length && (
          <div className='showing-contacts'>
            <span>Showing {visibleContacts.length} of {contacts.length} contacts </span>
            <button onClick={this.clearQuery} >Show All </button>
          </div>
        )}

      <ol className='contact-list'>
        {visibleContacts.map((contact) => (
          <li key={contact.id} className='contact-list-item'>
            <div className='contact-avatar' style={{
              backgroundImage: `url(${contact.avatarURL})`
            }} />
            <div className='contact-details'>
              <p> {contact.name} </p>
              <p> {contact.email} </p>
            </div>
            <button onClick={()=>onDeleteContact(contact)} className='contact-remove'>
              Remove
            </button>
          </li>
        ))}
      </ol>
      </div>

    )
  }
}

export default ListContacts
