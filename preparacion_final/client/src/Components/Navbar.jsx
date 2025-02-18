// Link : Nos permite redirigir a otro componente
// UseNavigate : Nos permite la navegación entre las paginas
import { Link , useNavigate } from 'react-router-dom'
import useAuth from '../auth/auth';

const NavBar = () => {

    const {isauth, nombre, logout} = useAuth()
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        window.location.reload();
        navigate('/');
    }
    
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            <div className="p-0 container">
            <Link className="navbar-brand" to="/">Navbar</Link>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link className="nav-link fw-bold" aria-current="page" to="/">
                    HOME
                    </Link>
                </li>
                </ul>
    
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                {isauth ? (
                    <>
                    <li className="nav-item">
                        <Link className="nav-link fw-bold" to="/contactos">
                        CONTACTOS
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link fw-bold" to="/usuario">
                        ¡Hola, {nombre.toUpperCase()}!
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link fw-bold" to="/" onClick={handleLogout}>
                        CERRAR SESIÓN
                        </Link>
                    </li>
                    </>
                ) : (
                    <>
                    <li className="nav-item">
                        <Link className="nav-link fw-bold" to="/login">
                        LOGIN
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link fw-bold" to="/registro">
                        REGISTRO
                        </Link>
                    </li>
                    </>
                )}
                </ul>
            </div>
            </div>
        </nav>
    )
}

export default NavBar