import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./domainModal.css";
import "@fontsource/mulish";
import "@fontsource/inter";
import "@fontsource/martel";

const domainUrl = 'https://api.insights-club-vitb.ml/dept'

function MemberCard({ details }) {
    return (
        <div className="member-card">
            <img className="member-pfp"
                src="https://via.placeholder.com/300/FF8863/000000?text=%20"
                alt={`${details.name}`}
            />
            <div className="member-card-text">
                <h5 className="member-name">{details.name}</h5>
                <p className="member-description">{details.description}</p>
            </div>
        </div>
    );
}

function DomainModal({ domainID, domainDescr,displayModal }) {
    
    const [memberList, setMemberList] = useState([]);

    const insideClick = (e) => {
        // prevents the modal from closing when user has clicked somewhere inside it
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        return false;
    }

    useEffect(() => {
        axios.get(`${domainUrl}/${domainID}`)
            .then((res) => {
                setMemberList(res.data.users);
            })
            .catch((err) => {
                console.error(err);
            })
    }, [domainID]);
    

    return (
        <div className="modal-root" onClick={() => { displayModal(false) }}>
            <div className="domain-modal-card" onClick={insideClick}>
                <button className="domain-modal-cross-button"
                    onClick={() => { displayModal(false) }}
                >
                    <svg width="48px" height="48px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z" />
                    </svg>
                </button>
                <p className="domain-details">{domainDescr}</p>
                <div className="member-grid">
                    {
                        memberList.map((member) => {
                            return <MemberCard key={member._id} details={member} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default DomainModal;