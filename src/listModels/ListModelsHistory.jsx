import axios from "axios";
import { useEffect, useState } from "react";
import { FaTimes, FaCheck, FaSpinner, FaClock } from 'react-icons/fa';
import { Navigate } from "react-router-dom";
import API_BASE_URL from "../Config";
import { jwtDecode } from "jwt-decode";


export default function ListModelsHistory() {

  const [annonces, setAnnonces] = useState([]);
  useEffect(() => {
    fetchData();
  }, []); 

  const fetchData = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const headers = {
        Authorization: `${accessToken}`,
      };
      const userId = jwtDecode(accessToken).idUser;
    
      const api=`${API_BASE_URL}/annoncesHistorique/${userId}` 
      const annoncesResponse = await axios.get(api, { headers });
      const annoncesData = annoncesResponse.data.listAnnonces || [];
      setAnnonces(annoncesData);
      console.log(annoncesResponse);
    } catch (error) {
      console.error('Failed to fetch data', error);
      if (error.response && error.response.status === 403) {
        Navigate('/');
      }
    }
  }; 

  return (
    <div>
      {annonces.length > 0 ? (
        annonces.map((annonce) => (
          <div key={annonce.id_annonce} className="product-item col-lg-3 col-md-6 col-sm-6">
            <div className="item" id="annonces">
              <div className="image-container">
                <a className="item-img-wrapper-link" href="single-product.html">
                            {annonce.images.length > 0 ? (
                                <img className="img-fluid" src={annonce.images[0]} alt="Products" />
                            ) : (
                                <img className="img-fluid" src={"images/product/product@3x.jpg"} alt="Products" />
                            )}
                </a>
              </div>
              <div className="item-content">
                <div className="what-product-is">
                <h6 className="item-title">
                    {annonce.nom_modele}


                  </h6>
                  <div className="item-description">
                    <p>{annonce.description}</p>
                  </div>
                  <div className="item-description">
                    <h6 className="item-title">
                      Details:
                    </h6>
                    <p>Marque: {annonce.marque}</p>
                    <p>Categorie: {annonce.categorie}</p>
                    <p>Carburant: {annonce.carburant}</p>
                    <p>Etat général: {annonce.etat_general}/10 situé à {annonce.localisation}</p>
                    {/* <p>Note: {annonce.etatGeneral}/10 situé à {annonce.localisation}</p> */}
                    <p></p>
                  </div>
                </div>
                <div className="price-template">
                  <div className="item-new-price">
                    Ar {annonce.prix}
                  </div>
                </div>
              </div>
                {annonce.etatValidation === '30' ? (
                        <div class="tag sale">
                            
                            <span><FaCheck className="icon-check" /></span>
                        </div>
                    ) : annonce.etatValidation === '-30' ? (
                        <div class="tag new">
                            <span><FaTimes className="icon-cross cross-color" /></span>
                        </div>
                        
                    ) : annonce.etatValidation === '20' ? (
                        <div class="tag discount">
                            <span><FaSpinner className="spin" /></span>
                        </div>
                    ) : 
                        annonce.etatValidation ==='1' ?(
                        <div className="tag hot">
                            <span> <FaClock className="clock" /></span>
                        </div>
                    ): null
                }
            </div>
          </div>
        ))
      ) : (
        <div className="product-item col-lg-4 col-md-6 col-sm-6" id="annonces">
          <div className="item" id="annonces">
            <div className="image-container"></div>
            <div className="item-content">
              <div className="what-product-is">
                <h6 className="item-title">
                  <a href="single-product.html">Pas d'annonce en favori disponible </a>
                </h6>
                <div className="item-description">
                  <p>La liste affichée dépend de vos annonces mises en favori.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
