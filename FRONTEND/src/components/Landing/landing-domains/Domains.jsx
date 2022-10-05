import React, { Fragment, useState, useEffect } from "react";
import "@fontsource/mulish";
import DomainModal from "./DomainModal/DomainModal";
import './domains.css';
import { Outlet } from "react-router-dom";
import axios from "axios";

const domainUrl = "https://api.insights-club-vitb.ml/dept";

function TileRow({ rows, displayModal, setdomainDescr,setPage }) {
    return (
            rows.map((row, index) => (
                <div key={index} className="tile-row">{
                    row.map((tile) => (
                        <button className="tile-border-wrapper" /* href={tile.link} */
                            key={tile._id}
                            onClick={() => {
                                setPage(tile._id)
                                setdomainDescr(tile.description)
                                displayModal(true);
                            }}
                        >
                            <span className="tile-description">
                                <span className="tile-description-text">{tile.shortDescription}</span>
                            </span>
                            <span className="tile-text-wrapper">
                                <span className="tile-text">{tile.name}</span>
                            </span>
                        </button>
                    ))
                }</div>
            ))
    );
}

function Domains() {
    const [showDomainModal, displayDomainModal] = useState(false);
    const [domainPage, setDomainPage] = useState('');
    const [domainDescr, setdomainDescr] = useState('');
    const [tilesRows, setTilesRows] = useState([]);

    useEffect(() => {
        axios.get(`${domainUrl}/all`)
            .then((res) => {
                const len = res.data.departments.length;
                setTilesRows([
                    res.data.departments.slice(0, Math.ceil(len / 2)),
                    res.data.departments.slice(Math.ceil(len / 2), len)
                ]);
            })
            .catch((err) => {
                console.error(err);
            })
    }, []);

    useEffect(() => {
        if (showDomainModal === true)
            document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
        else
            document.getElementsByTagName('body')[0].style.overflowY = 'scroll';
    }, [showDomainModal]);

    if (tilesRows.length > 0)
    return (
        <Fragment>
            {showDomainModal && < DomainModal domainID={domainPage} domainDescr={domainDescr}
            displayModal={displayDomainModal} />}
            <div className="grid6">
                <h2 className="grid-heading">Domains</h2>
                <TileRow rows={tilesRows} displayModal={displayDomainModal}
                setdomainDescr={setdomainDescr} setPage={setDomainPage} />
            </div>
            <Outlet />
        </Fragment>
    );
    else
        return null;
}

export default Domains;
