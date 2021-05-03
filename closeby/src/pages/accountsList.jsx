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

    const deleteAccount = async (id) => {
        const response  = await axios.delete(`/accounts/${id}`)
        .catch((err) => console.log("Error: ", err));
    
        if(response){
            getAccount();
        }
      }

    useEffect(() => {
        getAccount();
    }, []);

    return (
        <div style={{
            justifyContent: 'center', 
            alignItems: 'center', 
            }}
        >
            {noAccounts && <h2>No Accounts found!</h2>}
            {!noAccounts && accounts.map((account, idx) => (
                <Account key={idx} {...account} onDelete={deleteAccount}/>
            ))}
        </div>
    )
}

export default AccountsList;
