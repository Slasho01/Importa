import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getUserBillingInfoById, getUserInfoById,
    postUserInfo, postUserBilling,
    updateUserBillingInfo, updateUserInfo
} from '../../redux/actions';
import Input from '../UI/Input';
import Button from '../UI/Button';

const EditProfile = () => {
    const dispatch = useDispatch();
    const userinfo = useSelector(state => state.userInfo);
    const userbilling = useSelector(state => state.userBilling);
    const [isEditing, setIsEditing] = useState(false);

    // Formulario profile
    const [formData, setFormData] = useState({
        fullname: '',
        address: '',
        phone: '',
        rut: '',
        birth_date: '',
        currentPassword: '',
        newPassword: ''
        // Agrega más campos según sea necesario
    });

    // Formulario Facturacion
    const [formDataB, setFormDataB] = useState({
        name: '',
        address: '',
        rut: ''
        // Agrega más campos según sea necesario
    });

    const [activeForm, setActiveForm] = useState('profile'); // Estado para controlar el formulario activo
/*
    // Efecto para establecer isEditing basado en datos existentes
    useEffect(() => {
        setIsEditing(!userinfo.fullname || !userinfo.rut || !userinfo.birth_date); // Establecer isEditing a true si no hay datos
    }, [userinfo]);
*/
    // Efectos para obtener datos del usuario y facturación
    useEffect(() => {
        dispatch(getUserInfoById());
        dispatch(getUserBillingInfoById());
    }, [dispatch]);

    // Actualizar formData cuando cambian los datos de userinfo y userbilling
    useEffect(() => {
        if (userinfo) {
            setFormData({
                fullname: userinfo.fullname || '',
                address: userinfo.address || '',
                phone: userinfo.phone || '',
                rut: userinfo.rut || '',
                birth_date: userinfo.birth_date || '',
                userId: userinfo.userId || ''
                // Agrega más campos según sea necesario
            });
        }
    }, [userinfo]);

    useEffect(() => {
        if (userbilling) {
            setFormDataB({
                name: userbilling.name || '',
                rut: userbilling.rut || '',
                address: userbilling.address || '',
                userId: userbilling.userId || ''
            });
        }
    }, [userbilling]);

    // Manejar cambios en los inputs del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        setFormDataB(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Enviar formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (activeForm === 'profile') {
                if (formData.userId) {
                    await dispatch(updateUserInfo(formData, userinfo.id));
                } else {
                    const userId = await getUserIdFromToken();
                    formData.userId = userId;
                    await dispatch(postUserInfo(formData));
                }
                window.location.reload();
            } else if (activeForm === 'billing') {
                if (formDataB.userId) {
                    await dispatch(updateUserBillingInfo(formDataB, userbilling.id));
                } else {
                    const userId = await getUserIdFromToken();
                    formDataB.userId = userId;
                    await dispatch(postUserBilling(formDataB));
                }
                window.location.reload();
            }
            // Opcional: Actualizar localmente el estado para reflejar cambios sin recargar
        } catch (error) {
            console.error({ error: error.message });
        }
    };

    // Manejar clic en el menú
    const handleMenuClick = (formType) => {
        setActiveForm(formType);
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-golden-sand-300 dark:bg-gray-700 py-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-7xl w-full flex justify-center'>
                <div className='flex flex-col sm:flex-row w-full justify-center'>
                    {/* Div para el menú */}
                    <div className='bg-golden-sand-500/50 dark:bg-gray-400/50 p-8 sm:rounded-l-3xl py-8 px-8 w-full sm:max-w-md space-y-8 shadow-lg'>
                        <Button onClick={() => handleMenuClick('profile')}>Perfil</Button>
                        <Button onClick={() => handleMenuClick('password')}>Cambiar Contraseña</Button>
                        <Button onClick={() => handleMenuClick('billing')}>Informacion de Facturacion</Button>
                    </div>
                    {/* Div para el formulario */}
                    <div className='bg-golden-sand-500/50 dark:bg-gray-400/50 p-8 sm:rounded-r-3xl py-8 px-8 w-full sm:max-w-md space-y-8 shadow-lg'>
                        {activeForm === 'profile' && (
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="fullname">Nombre completo:</label>
                                    <Input
                                        disabled={!isEditing}
                                        type="text"
                                        id="fullname"
                                        name="fullname"
                                        value={formData.fullname}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="rut">Rut:</label>
                                    <Input
                                        disabled={!isEditing}
                                        type="text"
                                        id="rut"
                                        name="rut"
                                        value={formData.rut}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="address">Direccion:</label>
                                    <Input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone">Telefono:</label>
                                    <Input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="birth_date">Fecha de nacimiento:</label>
                                    <Input
                                        disabled={!isEditing}
                                        type="date"
                                        id="birth_date"
                                        name="birth_date"
                                        value={formData.birth_date}
                                        onChange={handleChange}
                                    />
                                </div>
                                <Button type="submit">Guardar</Button>
                            </form>
                        )}
                        {activeForm === 'password' && (
                            <form onSubmit={handleSubmit}>
                                {/* Formulario para cambio de contraseña */}
                                <div>
                                    <label htmlFor="currentPassword">Contraseña Actual:</label>
                                    <Input
                                        type="password"
                                        id="currentPassword"
                                        name="currentPassword"
                                        value={formData.currentPassword}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="newPassword">Nueva Contraseña:</label>
                                    <Input
                                        type="password"
                                        id="newPassword"
                                        name="newPassword"
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                    />
                                </div>
                                <Button type="submit">Cambiar Contraseña</Button>
                            </form>
                        )}
                        {activeForm === 'billing' && (
                            <form onSubmit={handleSubmit}>
                                {/* Formulario para datos de facturación */}
                                <div>
                                    <label htmlFor="name">Razon Social:</label>
                                    <Input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formDataB.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="rut">Rut:</label>
                                    <Input
                                        type="text"
                                        id="rut"
                                        name="rut"
                                        value={formDataB.rut}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="address">Direccion:</label>
                                    <Input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={formDataB.address}
                                        onChange={handleChange}
                                    />
                                </div>
                                <Button type="submit">Guardar Datos de Facturación</Button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
