import { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

const Registro = () => {

    // Definimos la logica del componente
    // El setEmail es para el input específico del correo electronico
    const [ nombre , setNombre] = useState()
    const [ empresa , setEmpresa] = useState()
    const [ domicilio , setDomicilio ] = useState()
    const [ telefono , setTelefono ] = useState()
    const [ password  , setPassword] = useState()
    const [ correo , setCorreo] = useState()
    const navigate = useNavigate()

    const sendForm = async(evento) => {
          evento.preventDefault()
          try {
            await axios.post('http://localhost:5500/users/create-users' , {nombre , empresa , domicilio , telefono , password , correo})
            alert('Su registro a sido exitoso')
            navigate("/login")
          } catch (error) {
            alert('Su registro no se pudo completar')
            console.log(error);
          }
    }
     
    return (
        <section className="container py-5">
            <h2 className="text-center">REGISTRAR</h2>
            <hr />
            <form className="row justify-content-center" onSubmit={sendForm}>
                <div className="mb-3 p-0 col-7">
                    <input type="text" className="w-100" placeholder="Nombre" onChange= { (evento) => setNombre( evento.target.value)} value = {nombre}/>
                </div>
                <div className="mb-3 p-0 col-7">
                    <input type="text" className="w-100" placeholder="Correo Electrónico" onChange= { (evento) => setCorreo( evento.target.value)} value = {correo}/>
                </div>
                <div className="mb-3 p-0 col-7">
                    <input type="text" className="w-100" placeholder="Empresa" onChange= { (evento) => setEmpresa( evento.target.value)} value = {empresa} />
                </div>
                <div className="mb-3 p-0 col-7">
                    <input type="text" className="w-100" placeholder="Dirección" onChange= { (evento) => setDomicilio( evento.target.value)} value = {domicilio}/>
                </div>
                <div className="mb-3 p-0 col-7">
                    <input type="text" className="w-100" placeholder="Telefono" onChange= { (evento) => setTelefono( evento.target.value)} value = {telefono}/>
                </div>
                <div className="mb-3 p-0 col-7">
                    <input type="password" className="w-100" placeholder="Contraseña" onChange= { (evento) => setPassword( evento.target.value)} value = {password} />
                </div>
                <button type="submit" className="col-7 bg-dark fw-bold btn btn-primary"> ENVIAR </button>
                <p className="text-center mt-2">¿Ya tienes una cuenta? Entonces, <Link to="/login">INGRESÁ</Link></p>
            </form>
        </section>
    )
}


export default Registro