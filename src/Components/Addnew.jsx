import { useRef, useState } from 'react';
import './Addnew.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function AddNew({ setCreateData, msg }){
    const [addNewModalDisplay, setAddNewModalDisplay]= useState('none');
    const [nameError, setNameError] = useState('');
    const [surnameError, setSurnameError] = useState('');
    const nameRef = useRef(null);
    const surnameRef = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        const name = nameRef.current.value;
        const surname = surnameRef.current.value;
        
        if (!validateName(name)) {
            setNameError('Įveskite tinkamą vardą.');
            return;
        }
        
        if (!validateSurname(surname)) {
            setSurnameError('Įveskite tinkamą pavardę.');
            return;
        }

        // Clear any existing error messages
        setNameError('');
        setSurnameError('');
        setCreateData({Name:name, Surname:surname, Balance:0}); //su formos info sukuria nauja accounta
        setAddNewModalDisplay('none');
        msg('Sąskaita pridėta', 'info');
        // Reset the form
        nameRef.current.value = '';
        surnameRef.current.value = '';
    };

    const validateName = (name) => {
    // Custom validation logic for name
    return /^[A-Ža-z\s]+$/.test(name);
    };

    const validateSurname = (surname) => {
    // Custom validation logic for surname
    return /^[A-Ža-z\s]+$/.test(surname);
    };

    function openAddNew (){
        setAddNewModalDisplay('block');
    }

    return (
        <div className="addNewModalWrapp">
            <button className="btn add-new" onClick={openAddNew }>Pridėti naują sąskaitą</button>
            <div className="addNewModal" style={{display:addNewModalDisplay}}>
                <div className="addNewFormWrapp">
                    <button className="close" onClick={_=>{
                        setAddNewModalDisplay('none');
                        nameRef.current.value = '';
                        surnameRef.current.value = '';
                        }}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                        <form onSubmit={handleSubmit} className='addNew'>  
                            
                            <label htmlFor='name' style={{color: 'black'}}>Vardas:</label>
                            <input type="text" id="name" ref={nameRef}  required />
                            {nameError && <div className="error-message">{nameError}</div>}

                            <label htmlFor='surname' style={{color: 'black'}}>Pavardė:</label>
                            <input type="text" id="surname" ref={surnameRef} required />
                            {surnameError && <div className="error-message">{surnameError}</div>}

                            <button className="btn" type="submit">Pridėti naują sąskaitą</button>
                        </form>
                </div>
            </div>
        </div>
    )
}