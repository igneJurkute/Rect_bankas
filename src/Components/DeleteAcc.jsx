import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function DeletaAcc({deleteModalData, setDeleteModalData,deleteMessage, setEditData, setDeleteData, msg}){
    
    if (deleteModalData === null){
        return ;
    }

    const handleParentClick = event => {
        event.preventDefault();
        if (event.target === event.currentTarget) {
            setDeleteModalData(null);
            msg('Veiksmas atšauktas', 'error');
        }
    };
    
 
    return (
        <div className="modal" onClick={handleParentClick}>
            <div className="modal-wrapper">

                <div className="close" onClick={_=>{
                        setDeleteModalData(null);
                        msg('Veiksmas atšauktas', 'error');
                        }}><FontAwesomeIcon icon={faXmark} />
                </div>

                <h4 style={{whiteSpace: 'pre-line', textAlign:'center'}}>{deleteMessage}</h4>
                {deleteModalData.Balance === 0 ?
                    (    <div style={{display:'flex', gap:30}}>
                            <button 
                                className="btn" onClick={_=>{setDeleteModalData(null);msg('Veiksmas atšauktas', 'error');}}>Atšaukti</button>
                            <button className="btn" onClick={_=>{setDeleteData({...deleteModalData, id:deleteModalData.id}); setDeleteModalData(null);}}>Ištrinti</button>
                        </div>
                    ) : (
                        <div style={{display:'flex', gap:30}}>
                            <button className="btn" onClick={_=>{setDeleteModalData(null);msg('Veiksmas atšauktas', 'error');}}>Atšaukti</button>
                            <button className="btn" onClick={_=>{setEditData({...deleteModalData, Balance:0, id: deleteModalData.id}); setDeleteModalData(null); msg('Lėšos nurašytos', 'info');}}>Nuskaičiuoti lėšas</button>
                        </div>
                    )
                }
            </div>
        </div>
    )

}
