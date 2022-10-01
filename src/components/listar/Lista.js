import React, { useEffect, useState } from "react";
import styles from './Lista.module.css';
import { MdAdd, MdDelete } from 'react-icons/md';
import { BsInfoLg } from 'react-icons/bs';
import swal from "sweetalert";
import 'react-modern-drawer/dist/index.css';
import { useNavigate } from "react-router-dom";
import ReactLoading from 'react-loading';
const Lista = () => {
    const [dados, setdados] = useState([]);
    const [loading, setLoading] = useState(false)
    const redirect = useNavigate();
    const handleRedirect = (rota) => {
        redirect(`/${rota}`);
    }
    useEffect(() => {
        setLoading(true);
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((json) => {
                setdados(json)
                setLoading(false);
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
    if (loading) {
        return (
            <div
                style={{
                    width: '100%',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <ReactLoading type='spokes' color='#dbd7d7' height={'100px'} width={'100px'} />
            </div>
        )
    }
    else {
        return (
            <>
                <div className={styles.container}>
                    <h4 className={styles.titulo}>Lista de Dados API - Visualização
                        <span className={styles.dispositivo}>
                            {/* tipo de dispositivo aqui */}
                        </span>
                    </h4>
                    <table cellSpacing='0'>
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
                                            <button onClick={() => handleRedirect('info-user')} style={{ backgroundColor: '#4F4F4F' }}>
                                                <BsInfoLg size='20' />
                                            </button>
                                            <button onClick={() => handleRedirect('cadastrar-user')} style={{ backgroundColor: 'green' }}>
                                                <MdAdd size='20' />
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
            </>
        )
    }
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