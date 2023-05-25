import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import CurrencyInput from 'react-currency-input-field';

export default function MinusMoney({ minusModalData, setMinusModalData, setEditData, msg}){

    const [minusAmmount, setMinusAmmount]= useState(0);
    const [alert, setAlert] = useState('Įveskite sumą, kurią norite išimti:')

    const handleMinusAmmount = e =>{
        setMinusAmmount(e);
    };

    if(parseFloat(minusAmmount) < 0 || isNaN(parseFloat(minusAmmount)) ){
        setMinusAmmount(0);
    }

    const minus = _ => {
        if (parseFloat(minusAmmount)>(minusModalData.Balance/100)){
            setAlert('Galima išimti tik iki '+ (minusModalData.Balance/100) +'\n\r €. Įveskite sumą, kurią norite išimti:' );
            setMinusAmmount((minusModalData.Balance/100));
            msg('Nepakanka lėšų', 'error');
            return;
        }
        setAlert('Įveskite sumą, kurią norite išimti:' );
        const diff = (minusModalData.Balance/100) - parseFloat(minusAmmount);
        if (diff <0 || isNaN(diff) || diff === null || diff===undefined){
            setAlert('Error. Bandykite dar kartą');
            return
        }
        const a = Math.round(diff * 100);
        setEditData({...minusModalData, Balance:a, id: minusModalData.id});
        msg('Lėšos nurašytos', 'info');
        setMinusModalData(null);
        setMinusAmmount(0);
    }
                       

    const handleParentClick = event => {
        event.preventDefault();
        if (event.target === event.currentTarget) {
            setMinusModalData(null);
            setMinusAmmount(0);
            msg('Veiksmas atšauktas', 'error');
        }
    };


    const displayValue = minusAmmount===0?'':minusAmmount;

    if (minusModalData === null){
        return null;
    }

    if (minusModalData.Balance === 0) {
        return (
            <div className="modal" onClick={handleParentClick}>
                <div className="modal-wrapper">

                    <div className="close" onClick={_=>{
                            setMinusModalData(null);
                            setMinusAmmount(0);
                            msg('Veiksmas atšauktas', 'error');
                            }}><FontAwesomeIcon icon={faXmark} />
                    </div>

                    <h4>Sąskaita tuščia, negalima išimti pinigų.</h4>
                    <button className="btn"  onClick={_=>{
                        setMinusModalData(null);
                        setMinusAmmount(0);
                        msg('Veiksmas atšauktas', 'error');
                        }}>Atšaukti</button>
                </div>
            </div>
        )
    }

    return (
        <div className="modal" onClick={handleParentClick}>
            <div className="modal-wrapper">

                <div className="close" onClick={_=>{
                        setMinusModalData(null);
                        setMinusAmmount(0);
                        msg('Veiksmas atšauktas', 'error');
                        }}><FontAwesomeIcon icon={faXmark} />
                </div>

                <h4>{alert}</h4>
                <CurrencyInput
                    id="input-example"
                    name="input-name"
                    placeholder="Įveskite sumą"
                    defaultValue={minusAmmount}
                    decimalsLimit={2}
                    value={displayValue}
                    allowNegativeValue={false}
                    suffix={' €'}
                    onValueChange={handleMinusAmmount}
                />
                <div style={{display:'flex', gap:30}}>
                    <button className="btn"  onClick={_=>{
                        setMinusModalData(null);
                        setMinusAmmount(0);
                        msg('Veiksmas atšauktas', 'error');
                        }}>Atšaukti</button>
                    <button className="btn"  onClick={minus}>Nuskaičiuoti lėšas</button>
                </div>
            </div>
        </div>
    )

}
