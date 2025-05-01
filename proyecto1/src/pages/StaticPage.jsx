import { useNavigate } from "react-router-dom";
import "../styles/staticpage.css";
import Flecha from "../img/FlechaIzquierda.png";
import Banner from "../img/RickYMortyBanner.jpg";
import Telefono from "../img/Telefono.png";
import Logo from "../img/LogoAPI.png";
import AdultSwim from "../img/AdultSwim.jpg";
import Trajes from "../img/Trajes.jpg";
import Aliens from "../img/Alien.webp";

export default function StaticPage() {
    const navigate = useNavigate();

    const Volver = () => {
        navigate(`/`);
    };

    return (
        <div className="extra-wrapper">
            <div className="header">
                <button className="hamburguesa">☰</button>
                <img src={Logo} alt="Logo" />

                <div className="botones-header">
                    <div className="dropdown">
                        <span className="flecha">▼</span>
                        <span>Nuestros Resorts</span>
                    </div>

                    <div className="dropdown">
                        <span className="flecha">▼</span>
                        <span>Contactos</span>
                    </div>

                    <div className="telefono">
                        <img src={Telefono} alt="Teléfono" />
                        <span>800-681-5338</span>
                    </div>
                </div>
            </div>

            <div className="body">
                <div className="banner">
                    <img src={Banner} alt="Banner" />

                    <div className="banner-text">
                        <div className="boton" onClick={Volver}>
                            <img src={Flecha} alt="Flecha" />
                            <button><strong>VOLVER</strong></button>
                        </div>
                        <h3>La API de Rick y Morty!</h3>
                    </div>
                </div>

                <div className="contenido">
                    <p>
                      Rick y Morty (en inglés: Rick and Morty) es una serie de televisión estadounidense de animación para adultos creada por Justin Roiland y Dan Harmon en 2013 para Adult Swim. 
                      La serie sigue las desventuras de un científico, Rick Sánchez, y su fácilmente influenciable nieto, Morty, quienes pasan el tiempo entre la vida doméstica y los viajes intergalácticos.
                    </p>
                    <img src={Aliens} alt="Aliens" />
                    <p>La mejor serie de ciencia ficción que podrás encontrar!</p>
                    <img src={Trajes} alt="Trajes" />
                    <p>Disponible en Adult Swim los martes a las 11pm</p>
                    <img src={AdultSwim} alt="Adult Swim" />
                </div>
            </div>

            <div className="footer">
                <img src={Logo} className="footer-img" alt="Logo Footer" />

                <div className="footer-info">
                    <div className="info">
                        {[1, 2, 3].map((col) => (
                          <div className="info-column" key={col}>
                            <h4><strong>Info</strong></h4>
                            {[...Array(8)].map((_, i) => (
                              <p key={i}>Dato</p>
                            ))}
                          </div>
                        ))}
                    </div>

                    <div className="form">
                        <h4><strong>Suscríbete a nuestras ofertas</strong></h4>

                        <div className="form-inputs">
                            <input placeholder="Nombre *" />
                            <input placeholder="Apellido *" />
                        </div>

                        <div className="form-inputs">
                            <input placeholder="Correo *" />
                            <select>
                                <option>México</option>
                                <option>USA</option>
                                <option>Canadá</option>
                            </select>
                        </div>

                        <div className="form-checkbox">
                            <input type="checkbox" id="terminos" />
                            <label htmlFor="terminos">
                                He leído y estoy de acuerdo con los <a href="#">Términos de Uso</a> y el <a href="#">Aviso de Privacidad Integral</a> puesto a mi disposición.*
                            </label>
                        </div>

                        <div className="form-boton">
                            <button className="form-submit">Enviar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
