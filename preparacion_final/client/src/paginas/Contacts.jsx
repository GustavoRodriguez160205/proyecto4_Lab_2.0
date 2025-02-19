import axios from "axios"
import { useState, useEffect } from "react"
import Card from "../Components/Card"
import useAuth from "../auth/auth"

// Definimos los estados
const Contact = () => {
  const [nombre, setNombre] = useState()
  const [empresa, setEmpresa] = useState()
  const [domicilio, setDomicilio] = useState()
  const [telefono, setTelefono] = useState()
  const [correo, setCorreo] = useState()
  const [contacts, setContacts] = useState([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const { isAdmin } = useAuth()

  // 
  const API_URL = 'http://localhost:5500/users/'

// Enviar el formulario
  const sendForm = async (evento) => {
    evento.preventDefault() // Evitamos que se recargue la pagina
    try {
      const resp = await axios.post(
        `${API_URL}create-contact`,
        { nombre, empresa, domicilio, telefono, correo }
      )
      alert("Contacto creado correctamente.")
      if (resp.data.respuesta) {
        setContacts((prevContacts) => [...prevContacts, resp.data.respuesta])
      }
      setNombre("")
      setEmpresa("")
      setDomicilio("")
      setTelefono("")
      setCorreo("")
    } catch (error) {
      alert("No se pudo crear el contacto.");
      console.log(error)
    }
  }

  const contactVisibility = async (id, newVisibility) => {
    try {
      await axios.patch( `${API_URL}edit-users/${id}`, {
        is_visible: newVisibility,
      })
      setContacts(
        contacts.map((contact) =>
          contact._id === id
            ? {
                ...contact,
                is_visible: newVisibility,
              }
            : contact
        )
      )
    } catch (error) {
      console.log("Error al actualizar la visibilidad", error)
    }
  }

  const contactPrivacity = async (id, newPrivacity) => {
    try {
      await axios.patch(`${API_URL}edit-users/${id}`, {
        is_public: newPrivacity,
      })
      // Recorremos la lista de contactos y modificamos la privacidad al contacto encontrado (mediante id)
      setContacts(
        contacts.map((contact) =>
          contact._id === id
            ? {
                ...contact,
                is_public: newPrivacity,
              }
            : contact 
        )
      )
    } catch (error) {
      console.log("Error al actualizar la visibilidad", error)
    }
  }

  // La misma lógica , pero editamos muchos valores
  const editContact = (
    id,
    newNombre,
    newEmpresa,
    newDomicilio,
    newTelefono,
    newCorreo,
    newPropietario
  ) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact._id === id
          ? {
              ...contact,
              nombre: newNombre,
              empresa: newEmpresa,
              domicilio: newDomicilio,
              telefono: newTelefono,
              correo: newCorreo,
              propietario: newPropietario,
            }
          : contact
      )
    );
  };
  
  // Filtra y elimina contactos en base a su id
  const deleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact._id !== id))
  }

  useEffect(() => {
    const getContacts = async () => {
      // Traemos los contactos en base a determinado usuario (si es o no admin)
      if (isAdmin === undefined) {  
        setLoading(true); // Manejamos la carga de la pagina
        return; 
      }
    
      try {
        // Traemos los contactos dependiendo si sos admin o no
        const resp = await axios.get( `${API_URL}get-contacts-by-role`, { withCredentials: true });
        setContacts(resp.data); // Almacnamos los datos traidos y almacenamos en contactos
      } catch (error){
        // Sino encuentra error , da recurso no encontrado
        if (error.response && error.response.status === 404) {
          setError("Recurso no encontrado");
        } else {
          // Para cualquier tipo de error
          setError("Error al traer contactos");
        }
      }
    };
    
  
    // Ejecutamos getContacts solo si isAdmin está definido
    if (isAdmin !== undefined) {
      getContacts();
    } 
  }, [isAdmin]); // Dependemos solo de isAdmin
  
  

  return (
    <section className="container py-5">
      <h2 className=""> CREAR CONTACTO</h2>
      <hr />
      <form className="row w-100 justify-content-center mb-5" onSubmit={sendForm}>
        <div className="mb-3 p-0 col-7">
          <input
            type="text"
            className="w-100"
            placeholder="Correo electrónico"
            onChange={(evento) => setCorreo(evento.target.value)} // Cambiamos en tiempo real el valor del correo
            value={correo}
          />
        </div>
        <div className="mb-3 p-0 col-7">
          <input
            type="text"
            className="w-100"
            placeholder="Empresa"
            onChange={(evento) => setEmpresa(evento.target.value)}
            value={empresa}
          />
        </div>
        <div className="mb-3 p-0 col-7">
          <input
            type="text"
            className="w-100"
            placeholder="Nombre"
            onChange={(evento) => setNombre(evento.target.value)}
            value={nombre}
          />
        </div>
        <div className="mb-3 p-0 col-7">
          <input
            type="text"
            className="w-100"
            placeholder="Dirección"
            onChange={(evento) => setDomicilio(evento.target.value)}
            value={domicilio}
          />
        </div>
        <div className="mb-3 p-0 col-7">
          <input
            type="text"
            className="w-100"
            placeholder="Telefono"
            onChange={(evento) => setTelefono(evento.target.value)}
            value={telefono}
          />
        </div>

        <button type="submit" className="btn btn-primary col-7 fw-bold bg-dark">
          CREAR CONTACTO
        </button>
      </form>
      <h3>MIS CONTACTOS</h3>
      <hr />
      <div>
        {/*Mostramos error si es que no se hallan encontrado los contactos o cualquier tipo de error*/}
        {error ? (
          <p>{error}</p>
        ) : (
          contacts.map((contact) => (
            <Card
              key={contact._id}
              nombre={contact.nombre}
              empresa={contact.empresa}
              propietario={contact.propietario}
              correo={contact.correo}
              telefono={contact.telefono}
              domicilio={contact.domicilio}
              isPublic={contact.is_public}
              isVisible={contact.is_visible}
              id={contact._id}
              onDelete={deleteContact}
              onEdit={editContact}
              onVisible={contactVisibility}
              onPublic={contactPrivacity}
              disabled="d-block"
            />
          ))
        )}
      </div>
    </section>
  )
}

export default Contact
