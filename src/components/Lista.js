import React, { useEffect, useState } from "react";
import styles from './Lista.module.css';
import { MdDelete } from 'react-icons/md';
import { BsInfoLg } from 'react-icons/bs';
import swal from "sweetalert";
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
const Lista = () => {
    const [dados, setdados] = useState([]);
    const [isOpen, setIsOpen] = React.useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((json) => {
                setdados(json)
            });
    }, [])

    const handleExcluir = (parametro) => {
        swal({
            title: "Atenção",
            text: `Deseja realmente excluir o usuário ${parametro.name}?`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    setdados(dados.filter((item) => item.id != parametro.id))
                    swal(`Usuário ${parametro.name} foi excluido com sucesso`, {
                        icon: "success",
                    });
                } else {
                    swal('Exclusão de usuário cancelada', {
                        icon: "error",
                    });
                }
            });
    }
    return (
        <>
            <div className={styles.container}>
                <table>
                    <thead>
                        <tr className={styles.container_topo}>
                            <th style={{ borderTopLeftRadius: 10 }}>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>WEBSITE</th>
                            <th>ZIPCODE</th>
                            <th style={{ borderTopRightRadius: 10 }}>AÇÕES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dados.map((item, index) => (
                                <tr key={index} className={styles.container_corpo}
                                    style={{ backgroundColor: index % 2 == 0 ? '#dbd7d7' : '#fffff' }}>
                                    <td className={styles.id} style={{ borderBottomLeftRadius: index == dados.length - 1 ? 10 : 0 }}>
                                        <button>
                                            {item.id}
                                        </button>
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.website}</td>
                                    <td>{item.address.zipcode}</td>
                                    <td className={styles.delete_buttom} style={{ borderBottomRightRadius: index == dados.length - 1 ? 10 : 0 }}>
                                        <button onClick={toggleDrawer} style={{ backgroundColor: '#4F4F4F' }}>
                                            <BsInfoLg size='20' />
                                        </button>
                                        <button onClick={() => handleExcluir(item)}>
                                            <MdDelete size='20' />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='right'
                className='bla bla bla'
            >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {dados.map((item, index) => (
                        <>
                            <td className={styles.id}>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.website}</td>
                            <td>{item.address.zipcode}</td>
                        </>
                    ))}
                </div>
            </Drawer>
        </>
    )
}
export default Lista;

// {
//     "id": 1,
//     "name": "Leanne Graham",
//     "username": "Bret",
//     "email": "Sincere@april.biz",
//     "address": {
//         "street": "Kulas Light",
//         "suite": "Apt. 556",
//         "city": "Gwenborough",
//         "zipcode": "92998-3874",
//         "geo": {
//             "lat": "-37.3159",
//             "lng": "81.1496"
//         }
//     },
//     "phone": "1-770-736-8031 x56442",
//     "website": "hildegard.org",
//     "company": {
//         "name": "Romaguera-Crona",
//         "catchPhrase": "Multi-layered client-server neural-net",
//         "bs": "harness real-time e-markets"
//     }
// }