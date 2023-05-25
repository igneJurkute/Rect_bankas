import { useEffect, useState } from 'react';
import './App.scss';
import Header from './Components/Header';
import { crudCreate, crudDelete, crudEdit, crudRead } from './Functions/localStorageCrud';
import List from './Components/List';
import Footer from './Components/Footer';
import AddMoney from './Components/Addmoney';
import MinusMoney from './Components/Minusmoney';
import DeletaAcc from './Components/DeleteAcc';
import Messages from './Components/Messages';
import { v4 as uuidv4 } from 'uuid';

const KEY = 'myBankAccounts';


function App() {

  const [listUpdate, setListUpdate] = useState(Date.now());
  const [accounts, setAccounts] = useState(null);
  const [createData, setCreateData] = useState(null);
  const [deleteModalData, setDeleteModalData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState('');
  const [addModalData, setAddModalData] = useState(null);
  const [minusModalData, setMinusModalData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [sort, setSort] = useState({sortDirection:'default', sortName:'Name'});
  const [filter, setFilter] = useState('');


  //R read
  useEffect(_ => {
    setAccounts(crudRead(KEY).map((c, i) => ({...c, row: i, show: true})));
  }, [listUpdate]);

  //C create
  useEffect(_ => {
    if (null === createData) {
        return;
    }
    crudCreate(KEY, createData);
    setListUpdate(Date.now());
    // msg('New color was creates', 'ok');
  }, [createData]);

  //U update
  useEffect(_ => {
    if (null === editData) {
        return;
    }
      crudEdit(KEY, editData, editData.id);
      setListUpdate(Date.now());
  }, [editData]);

  //D deleate
  useEffect(_ => {
    if (null === deleteData) {
        return;
    }
    crudDelete(KEY, deleteData.id);
    setListUpdate(Date.now());
    msg('Sąskaita ištrinta', 'ok');
  }, [deleteData]);

  //S Sort
  useEffect(() => {
    if (sort.sortDirection === 'default') {
        setAccounts(c => [...c].sort((a, b) => a.row - b.row));
    } else if(sort.sortDirection === 'up') {
          setAccounts(c => [...c].sort((a, b) => {
            if (typeof a[sort.sortName] === 'number' && typeof b[sort.sortName] === 'number') {
              return a[sort.sortName] - b[sort.sortName];
            } else {
              return a[sort.sortName].localeCompare(b[sort.sortName]);
            }}
            ));
    } else {
      setAccounts(c => [...c].sort((b, a) => {
        if (typeof a[sort.sortName] === 'number' && typeof b[sort.sortName] === 'number') {
          return a[sort.sortName] - b[sort.sortName];
        } else {
          return a[sort.sortName].localeCompare(b[sort.sortName]);
        }}
        ));
    }
  }, [sort, listUpdate]);

  const doSort = n => {
    setSort(s => {
      switch (s.sortDirection) {
          case 'default': return {sortDirection:'up', sortName:n};
          case 'up': return {sortDirection:'down', sortName:n};
          default: return {sortDirection:'default', sortName:n};
      }
    });
  }

  // Filter
  useEffect(() => {
    setAccounts(c => c.map(c => c.Name.toLowerCase().search(filter.toLowerCase()) !== -1 ? {...c, show: true} : {...c, show: false}))
  }, [filter, listUpdate]);

  //Messages
  const msg = (text, type) => {
    const id = uuidv4();
    const message = {
        id,
        text,
        type
    }
    setMessages(m => [...m, message]);
    setTimeout(_ => setMessages(m => m.filter(m => m.id !== id)), 5000);
  }

  return (
    <div className="App">
      <div>
        <header className="main-header">
          <Header
            setCreateData={setCreateData}
            filter={filter}
            setFilter={setFilter}
            msg={msg}
          />
        </header>
        <main>
          <List
            accounts={accounts}
            setDeleteData = {setDeleteData}
            setAddModalData = {setAddModalData}
            setMinusModalData = {setMinusModalData}
            setDeleteModalData = {setDeleteModalData}
            setDeleteMessage = {setDeleteMessage}
            deleteMessage = {deleteMessage}
            doSort = {doSort}
            sort = {sort}
          />
        </main>
      </div>
      <div className="main-footer-wrapp">
        <footer>
          <AddMoney 
            addModalData={addModalData}
            setAddModalData={setAddModalData}
            setEditData={setEditData}
            msg = {msg}
          />
          <MinusMoney
            minusModalData={minusModalData}
            setMinusModalData={setMinusModalData}
            setEditData={setEditData}
            msg = {msg}
          />
          <DeletaAcc 
            setDeleteMessage = {setDeleteMessage}
            deleteMessage = {deleteMessage}
            deleteModalData = {deleteModalData}
            setDeleteModalData = {setDeleteModalData}
            setEditData = {setEditData}
            setDeleteData={setDeleteData}
            msg = {msg}
          />
          <Footer />
        </footer>
      </div>
      <Messages messages={messages} />
    </div>
  );
}

export default App;
