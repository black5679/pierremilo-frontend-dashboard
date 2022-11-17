import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button } from 'react-bootstrap';
import classNames from 'classnames';

// components
import PageTitle from '../../components/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { usuarioGetAllPaginate } from '../../redux/actions';
import TableAsync from '../../components/TableAsync';

/* name column render */
const ApellidosColumn = ({ row }: { row: any }) => {
    return (
        <div className="table-user">
            <img src={row.original.foto} alt="" className="me-2 rounded-circle" />
            {row.original.apellidos}
        </div>
    );
};

/* status column render */
const StatusColumn = ({ row }: { row: any }) => {
    return (
        <React.Fragment>
            <span
                className={classNames('badge', {
                    'badge-soft-success': row.original.estado,
                    'badge-soft-danger': !row.original.estado,
                })}
            >
                {row.original.estado? 'Activo' : 'Inactivo'}
            </span>
        </React.Fragment>
    );
};

/* action column render */
const ActionColumn = () => {
    return (
        <React.Fragment>
            <Link to="#" className="action-icon">
                {' '}
                <i className="mdi mdi-eye"></i>
            </Link>
            <Link to="#" className="action-icon">
                {' '}
                <i className="mdi mdi-square-edit-outline"></i>
            </Link>
            <Link to="#" className="action-icon">
                {' '}
                <i className="mdi mdi-delete"></i>
            </Link>
        </React.Fragment>
    );
};

// columns to render
const columns = [
    {
        Header: 'Apellidos',
        accessor: 'apellidos',
        sort: true,
        Cell: ApellidosColumn,
        classes: 'table-user',
    },
    {
        Header: 'Nombres',
        accessor: 'nombres',
        sort: true,
    },
    {
        Header: 'Correo',
        accessor: 'correo',
        sort: true,
    },
    {
        Header: 'Celular',
        accessor: 'celular',
        sort: true,
    },
    {
        Header: 'Dni',
        accessor: 'dni',
        sort: true,
    },
    {
        Header: 'Rol',
        accessor: 'rol',
        sort: true,
    },
    {
        Header: 'Estado',
        accessor: 'estado',
        sort: true,
        Cell: StatusColumn,
    },
    {
        Header: 'Action',
        accessor: 'action',
        sort: false,
        Cell: ActionColumn,
    },
];

// give page size
const sizePerPageList = [
    {
        text: '10',
        value: 10,
    },
    {
        text: '25',
        value: 25,
    }
];

// main component
const Usuarios = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { usuarios, total, limit, page } = useSelector((state: RootState) => ({
        usuarios: state.Usuario.usuarios,
        total: state.Usuario.total,
        limit: state.Usuario.limit,
        page: state.Usuario.page
    }));
    
    useEffect(() => {
        dispatch(usuarioGetAllPaginate(limit,page));
    }, [dispatch]);

    const getAllPaginate = (limit: number, page: number) => {
        dispatch(usuarioGetAllPaginate(limit,page));
    }

    return (
        <React.Fragment>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Ecommerce', path: '/apps/ecommerce/customers' },
                    {
                        label: 'Customers',
                        path: '/apps/ecommerce/customers',
                        active: true,
                    },
                ]}
                title={'Customers'}
            />

            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col sm={4}>
                                    <Button className="btn btn-success mb-2">
                                        <i className="mdi mdi-plus-circle me-2"></i> Registrar
                                    </Button>
                                </Col>

                                <Col sm={8}>
                                    <div className="text-sm-end">
                                        <Button className="btn btn-success mb-2 me-1">
                                            <i className="mdi mdi-cog-outline"></i>
                                        </Button>

                                        <Button className="btn btn-light mb-2 me-1">Import</Button>

                                        <Button className="btn btn-light mb-2">Export</Button>
                                    </div>
                                </Col>
                            </Row>

                            <TableAsync
                                columns={columns}
                                data={usuarios}
                                total={total}
                                page={page}
                                pageSize={limit}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={true}
                                isSelectable={true}
                                isSearchable={true}
                                searchMethod={getAllPaginate}
                                tableClass="table-striped dt-responsive nowrap w-100"
                                searchBoxClass="my-2"
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Usuarios;
