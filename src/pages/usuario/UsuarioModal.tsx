import { useState } from 'react';
import { Row, Button, Modal } from 'react-bootstrap';
import * as yup from 'yup';

// components
import { usuarioInsert } from '../../redux/actions';
import { FormInput, VerticalForm } from '../../components';
import { yupResolver } from '@hookform/resolvers/yup';
import Table from '../../components/Table';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';

const columns = [
    {
        Header: 'Vista',
        accessor: 'vista',
        sort: true,
    },
    {
        Header: 'Visualizar',
        accessor: 'visualizar',
        sort: true,
    },
    {
        Header: 'Registrar',
        accessor: 'registrar',
        sort: true,
    },
    {
        Header: 'Editar',
        accessor: 'editar',
        sort: true,
    },
    {
        Header: 'Eliminar',
        accessor: 'eliminar',
        sort: true,
    },
];

interface UsuarioModalProps {
    usuario: any;
    open: boolean;
    toggleModal: () => void;
}
// main component
const Usuarios = ({usuario, open, toggleModal}: UsuarioModalProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const [data, setData] = useState<any>(usuario);

    const schemaResolver = yupResolver(
        yup.object().shape({
            nombres: yup.string().required('Please enter name'),
            correo: yup.string().required('Please enter email').email('Please enter valid email'),
            celular: yup
                .string()
                .required('Please enter phone')
                .matches(/^\d{10}$/, 'Phone number is not valid')
        })
    );

    const onSubmit = () => {
        dispatch(usuarioInsert(data))
    }

    return (
            <Modal size="lg" show={open} onHide={toggleModal}>
                <Modal.Header onHide={toggleModal} closeButton>
                    <h4 className="modal-title">Modal Heading</h4>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <VerticalForm onSubmit={onSubmit} resolver={schemaResolver}>
                        <Row>
                            <FormInput
                                label="Nombres"
                                type="text"
                                name="nombres"
                                placeholder="Nombres"
                                containerClass={'col-md-6 mb-3'}
                                onChange={(e: any) => {
                                    setData((prevState: any) => ({
                                        ...prevState,
                                        nombres: e.target.value
                                    }))
                                }}
                            />
                            <FormInput
                                label="Apellidos"
                                type="text"
                                name="apellidos"
                                placeholder="Apellidos"
                                containerClass={'col-md-6 mb-3'}
                                onChange={(e: any) => {
                                    setData((prevState: any) => ({
                                        ...prevState,
                                        apellidos: e.target.value
                                    }))
                                }}
                            />
                            <FormInput
                                label="Correo"
                                type="email"
                                name="correo"
                                placeholder="Correo"
                                containerClass={'col-md-6 mb-3'}
                                onChange={(e: any) => {
                                    setData((prevState: any) => ({
                                        ...prevState,
                                        correo: e.target.value
                                    }))
                                }}
                            />
                            <FormInput
                                label="Celular"
                                type="text"
                                name="celular"
                                placeholder="Celular"
                                containerClass={'col-md-6 mb-3'}
                                onChange={(e: any) => {
                                    setData((prevState: any) => ({
                                        ...prevState,
                                        celular: e.target.value
                                    }))
                                }}
                            />
                            <FormInput
                                label="Dni"
                                type="text"
                                name="dni"
                                placeholder="Dni"
                                containerClass={'col-md-6 mb-3'}
                                onChange={(e: any) => {
                                    setData((prevState: any) => ({
                                        ...prevState,
                                        dni: e.target.value
                                    }))
                                }}
                            />
                            <FormInput
                                label="Foto"
                                type="text"
                                name="foto"
                                placeholder="Foto"
                                containerClass={'col-md-6 mb-3'}
                                onChange={(e: any) => {
                                    setData((prevState: any) => ({
                                        ...prevState,
                                        foto: e.target.value
                                    }))
                                }}
                            />
                            <FormInput
                                label="Contraseña"
                                type="text"
                                name="contrasenia"
                                placeholder="Contraseña"
                                containerClass={'col-md-6 mb-3'}
                                onChange={(e: any) => {
                                    setData((prevState: any) => ({
                                        ...prevState,
                                        contrasenia: e.target.value
                                    }))
                                }}
                            />
                            <Table
                                columns={columns}
                                data={data.permisos}
                                pageSize={12}
                                isSortable={true}
                                pagination={true}
                                isSelectable={true}
                                tableClass="table-nowrap table-striped"
                            />
                        </Row>
                        <div className="text-end">
                            <Button variant="success" type="submit" className="waves-effect waves-light me-1" onClick={onSubmit}>
                                Save
                            </Button>
                            <Button variant="danger" className="waves-effect waves-light" onClick={toggleModal}>
                                Continue
                            </Button>
                        </div>
                    </VerticalForm>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={toggleModal}>
                        Close
                    </Button>{' '}
                    <Button variant="primary" onClick={toggleModal}>
                        Save changes
                    </Button>
                </Modal.Footer>
            </Modal>
    );
};

export default Usuarios;
