import React, {useState, useEffect} from 'react';
import { Account } from '../components/accountBox/accounts';
import { axios } from '../axios';

export const AccountsList = () => {

    const [accounts, setAccounts] = useState([]);

    const noAccounts = !accounts || (accounts && accounts.length === 0);


    const getAccount = async () => {
      const response = await axios.get("/accounts")
      .catch((err) => console.log("Error: ", err));

      if (response && response.data){
        setAccounts(response.data);
      }  
    };

    useEffect(() => {
        getAccount();
    }, []);

    return (
        <div style={{
            justifyContent: 'center', 
            alignItems: 'center', 
            }}
        >
            {noAccounts && <h2>No Reminders found!</h2>}
            {!noAccounts && accounts.map((account, idx) => (
                <Account key={idx} {...account}/>
            ))}
        </div>
    )
}

export default AccountsList;
