import axios from "axios";
import { useNavigate } from 'react-router-dom'
import useAuth from "../auth/auth"


const UserLog = () => {
    const { userId, nombre, empresa, correo, password, domicilio, telefono, setCorreo, setNombre, setEmpresa, setPassword, setDomicilio, setTelefono } = useAuth()
    const navigate = useNavigate()

    const sendForm = async (evento) => {
        evento.preventDefault()

        try {
            await axios.patch(`http://localhost:5500/users/edit-users/${userId}`, { nombre, empresa, correo, password, domicilio, telefono })
            alert('Usuario Actualizado')
            navigate('/')
        } catch (error) {
            console.log(error);

        }
    }

    const handlechange = (evento, campo) => {
        const valor = evento.target.value

        switch (campo) {
            case "correo":
                setCorreo(valor)
                break;
            case "empresa":
                setEmpresa(valor)
                break;
            case "domicilio":
                setDomicilio(valor)
                break;
            case "password":
                setPassword(valor)
                break;
            case "telefono":
                setTelefono(valor)
                break;
            case "nombre":
                setNombre(valor)
                break;

            default:
                break;
        }
    }

    return (
        <section className="container py-5">
            <h2 className="text-center">EDITÁ TU PERFIL</h2>
            <hr/>
            <form className="row justify-content-center" onSubmit={sendForm}>
                <div className="mb-3 p-0 col-7">
                    <input type="text" className="w-100" placeholder="correo electronico" onChange={(evento) => handlechange(evento , 'correo')} value={correo} />
                </div>
                <div className="mb-3 p-0 col-7">
                    <input type="text" className="w-100" placeholder="Empresa" onChange={(evento) => handlechange(evento , 'empresa')} value={empresa} />
                </div>
                <div className="mb-3 p-0 col-7">
                    <input type="text" className="w-100" placeholder="Nombre" onChange={(evento) => handlechange(evento , 'nombre')} value={nombre} />
                </div>
                <div className="mb-3 p-0 col-7">
                    <input type="text" className="w-100" placeholder="Dirección" onChange={(evento) => handlechange(evento , 'domicilio')} value={domicilio} />
                </div>
                <div className="mb-3 p-0 col-7">
                    <input type="text" className="w-100" placeholder="Telefono" onChange={(evento) => handlechange(evento , 'telefono')} value={telefono} />
                </div>
                <div className="mb-3 p-0 col-7">
                    <input type="password" className="w-100" placeholder="Contraseña" onChange={(evento) => handlechange(evento , 'password')} value={password} />
                </div>
                <button type="submit" className="btn btn-primary col-7 bg-dark fw-bold">ENVIAR</button>
            </form>
        </section>
    )
}

export default UserLog