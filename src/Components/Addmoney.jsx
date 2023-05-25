import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import CurrencyInput from 'react-currency-input-field';

export default function AddMoney({ addModalData, setAddModalData, setEditData, msg}){

    const [addAmmount, setAddAmmount]= useState(0);

    const handleAddAmmount = e =>{
        setAddAmmount(e);
    };

    if(parseFloat(addAmmount) < 0 || isNaN(parseFloat(addAmmount)) ){
        setAddAmmount(0);
    }

    const add = _ => {
        const sum = parseFloat(addAmmount) + (addModalData.Balance/100);
        const a = Math.round(sum * 100);
        setEditData({...addModalData, Balance: a, id: addModalData.id});
        msg('Lėšos pridėtos', 'ok');
        setAddModalData(null);
        setAddAmmount(0);
    }

    const handleParentClick = event => {
        event.preventDefault();
        if (event.target === event.currentTarget) {
            setAddModalData(null);
            setAddAmmount(0);
            msg('Veiksmas atšauktas', 'error');
        }
        };

    const displayValue = addAmmount===0?'':addAmmount;

    if (addModalData === null){
        return null;
    }

    return (
        <div className="modal" onClick={handleParentClick} >
            <div className="modal-wrapper">

                <div className="close" onClick={_=>{
                        setAddModalData(null);
                        setAddAmmount(0);
                        msg('Veiksmas atšauktas', 'error');
                        }}><FontAwesomeIcon icon={faXmark} />
                </div>

                <h4>Įveskite sumą, kurią norite pridėti:</h4>
                <CurrencyInput
                        id="input-example"
                        name="input-name"
                        placeholder="Įveskite sumą"
                        defaultValue={addAmmount}
                        decimalsLimit={2}
                        value={displayValue}
                        allowNegativeValue={false}
                        suffix={' €'}
                        onValueChange={handleAddAmmount}
                    />
                <div style={{display:'flex', gap:30}}>
                    <button className="btn"  onClick={_=>{
                        setAddModalData(null);
                        setAddAmmount(0);
                        msg('Veiksmas atšauktas', 'error');
                        }}>Atšaukti</button>
                    <button className="btn"  onClick={add}>Pridėti lėšų</button>
                </div>
            </div>
        </div>
    )
}


