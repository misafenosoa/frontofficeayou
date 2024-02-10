/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'
import API_BASE_URL from '../Config';
import {  useNavigate } from 'react-router-dom';

export default function ListeAnnonce(params) {
    const annonces = params.annonces
    const fetchData = params.fetchData 
    const setOrder = params.setOrder 
    const nav = useNavigate()
    const handleUnauthorized = () => {
        // Détruisez le token et redirigez vers la page de connexion
        localStorage.removeItem('accessToken');
        nav('/');
      };
    const handleSortChange = (e) => {
        const selectedValue = e.target.value;
        let order = 'desc';
    
        // Determine the order based on the selected value
        if (selectedValue === 'asc') {
          order = 'asc';
        }
    
        // Call setOrder with the determined order
        setOrder(order);
      };

    const handleAddFav = async (annonceID) =>{
        try {
            const accessToken = localStorage.getItem('accessToken');
            const headers = {
              Authorization: `${accessToken}`,
            };
            const userId = jwtDecode(accessToken).idUser;
            await axios.put(`${API_BASE_URL}/annoncesFavoris/${userId}/${annonceID}`,{},{headers})
            fetchData()
        }
        catch(error){
            console.log(error)
            if (error.response && error.response.status === 401) {
                handleUnauthorized()
            }
        }
    }


    return (
        <div class="col-lg-9 col-md-9 col-sm-12" >
        {/* <!-- Page-Bar --> */}
        <div class="page-bar clearfix">
            <div class="shop-settings">
                <a id="list-anchor" class="active">
                    <i class="fas fa-th-list"></i>
                </a>
            </div>
            {/* <!-- Toolbar Sorter 1  --> */}
            <div className="toolbar-sorter">
                <div className="select-box-wrapper">
                <label className="sr-only" htmlFor="sort-by">
                    Trier par
                </label>
                <select
                    className="select-box"
                    id="sort-by"
                    onChange={handleSortChange}
                >
                    <option selected="selected" value="desc">
                    Trier par : l'ajouté récemment
                    </option>
                    <option value="asc">Trié par : le plus ancien</option>
                </select>
                </div>
            </div>
            {/* <!-- //end Toolbar Sorter 1  --> */}
            {/* <!-- Toolbar Sorter 2  --> */}
            {/* <div class="toolbar-sorter-2">
                <div class="select-box-wrapper">
                    <label class="sr-only" for="show-records">Afficher Par Page</label>
                    <select class="select-box" id="show-records">
                        <option selected="selected" value="">Afficher: 8</option>
                        <option value="">Afficher: 16</option>
                        <option value="">Afficher: 28</option>
                    </select>
                </div>
            </div> */}
            {/* <!-- //end Toolbar Sorter 2  --> */}
        </div>
        {/* <!-- Page-Bar /- --> */}
        {/* <!-- Row-of-Product-Container --> */}
        <div class="row product-container list-style" id="annonces">
        {annonces.length > 0 ? (
            annonces.map((annonce) => (
                <div key={annonce.idAnnonce} class="product-item col-lg-4 col-md-6 col-sm-6">
                    <div class="item" id="annonces">
                    <div class="image-container">
                        <a class="item-img-wrapper-link" >
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
                                    <a href="single-product.html">Pas d'annonce disponible pour le filtre demande</a>
                                </h6>
                                <div class="item-description">
                                    <p>La liste affichee depend de votre requete, les annonces doivent avoir au moins un de votre filtre.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              
            )}


        </div>
        {/* <!-- Row-of-Product-Container /- --> */}
    </div>
    )
    
}