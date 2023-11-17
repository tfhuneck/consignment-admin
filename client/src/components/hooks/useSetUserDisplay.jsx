import { useState, useEffect } from "react";

export const useSetUserDisplay = () => {

    const [ display, setDisplay ]           = useState('');
    const overviewBtn                       = document.getElementById('overview');
    const listingsBtn                       = document.getElementById('listings');
    const balanceBtn                        = document.getElementById('balance');

    useEffect(() =>{
        setDisplay('overview')
    }, []);

    useEffect(() => {
        if(overviewBtn && listingsBtn && balanceBtn) {
            if(display === 'overview'){
                overviewBtn.className = 'btn-user-page btn-active';
                listingsBtn.className = 'btn-user-page';
                balanceBtn.className = 'btn-user-page';
            }
            if(display === 'listings'){
                overviewBtn.className = 'btn-user-page';
                listingsBtn.className = 'btn-user-page btn-active';
                balanceBtn.className = 'btn-user-page';
            }
            if(display === 'balance'){
                overviewBtn.className = 'btn-user-page';
                listingsBtn.className = 'btn-user-page';
                balanceBtn.className = 'btn-user-page btn-active';
            }
        }
    }, [display, setDisplay])

    return [ display, setDisplay ];
}