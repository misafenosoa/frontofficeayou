/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {jwtDecode} from 'jwt-decode'
import API_BASE_URL from '../Config';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
export default function ListModels() 
{

    const [annonces, setAnnonces] = useState([]);
    useEffect(() => {
        fetchData();
    },[]); 
    const nav = useNavigate()


      const fetchData = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                const headers = {
                    Authorization: `${accessToken}`,
                };
                const userId = jwtDecode(accessToken).idUser 
            
                const fav =`${API_BASE_URL}/annoncesFavoris/${userId}`
                const annoncesResponse = await axios.get(fav, { headers });
                const annoncesData = annoncesResponse.data.listAnnonces || [];
                setAnnonces(annoncesData);
                console.log(annoncesResponse)
            } 
            catch (error) {
                console.error('Failed to fetch data', error);
                if (error.response && error.response.status === 403) {
                    nav('/');
                  }
            }
        }; 



    const handleAddFav = async (annonceID) => {
        try {
        const accessToken = localStorage.getItem('accessToken');
        const headers = {
            Authorization: `${accessToken}`,
        };
        const userId = jwtDecode(accessToken).idUser;
        await axios.put(`${API_BASE_URL}/annoncesFavoris/${userId}/${annonceID}`, {}, {headers});
        fetchData()
        } catch (error) {
            if (error.response && error.response.status === 403) {
                nav('/');
              }
              
        }
    }

    return(
        <div>
        {annonces.length > 0 ? (
            annonces.map((annonce) => (
                <div key={annonce.idAnnonce} class="product-item col-lg-3 col-md-6 col-sm-6">
                    <div class="item" id="annonces">
                    <div class="image-container">
                        <a class="item-img-wrapper-link" href="single-product.html">
                        {annonce.annoncesPhotos.length > 0 ? (
                                <img className="img-fluid" src={annonce.annoncesPhotos[0]} alt="Products" />
                            ) : (
                                <img className="img-fluid" src={"images/product/product@3x.jpg"} alt="Products" />
                            )}
                        </a>
                        <div class="item-action-behaviors">
                            <button class="item-mail">Mail</button>
                            {console.log(annonce)}                            
                            <button class="item-addwishlist" id={annonce.status === 1 ? 'fav' : ''} onClick={() => handleAddFav(annonce.idAnnonce)}>Add to Wishlist</button>
                        </div>
                    </div>
                    <div class="item-content">
                        <div class="what-product-is">
                           
                            <h6 class="item-title">
                             {annonce.utilisateur.nom +" " +annonce.utilisateur.prenom +" a poste le modele: "+   annonce.modeles.nomModele}

                            </h6>
                            <div class="item-description">
                            <p>{annonce.description}</p>

                            </div>
                            <div class="item-description">
                            <h6 class="item-title">
                                Details:
                            </h6>
                            <p>Marque :{annonce.modeles.marque.marque} </p>
                            <p> Categorie : {annonce.modeles.categorie.categorie} avec un type de carburant : {annonce.modeles.carburant.carburant}</p>
                            <p>Note: {annonce.etatGeneral}/10 situe a {annonce.localisation}</p>
                            <p></p>

                            </div>

                        </div>
                        <div class="price-template">
                            <div class="item-new-price">
                            Ar {annonce.prix}

                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>

                    ))
                
            ):(

                <div class="product-item col-lg-4 col-md-6 col-sm-6" id="annonces">
                    <div class="item" id="annonces">
                        <div class="image-container">
                        </div>
                        <div class="item-content">
                            <div class="what-product-is">
                               
                                <h6 class="item-title">
                                    <a href="single-product.html">Pas d'annonce en favori disponible </a>
                                </h6>
                                <div class="item-description">
                                    <p>La liste affichee depend de vos annonces mises en favori .</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              
            )}
            
        </div>
    )
}