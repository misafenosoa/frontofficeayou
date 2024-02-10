/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import { useState } from "react";
import API_BASE_URL from "../../Config";
import {jwtDecode} from 'jwt-decode'
import { Link } from "react-router-dom";

export default function Header({ setAnnonces }) {
    const [searchKeyword, setSearchKeyword] = useState('');

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    try {
        const accessToken = localStorage.getItem('accessToken');
        const headers = {
          Authorization: `${accessToken}`,
        };
        let apiUrl = `${API_BASE_URL}/annoncesAccueilKeyWord`;
        let body ={ key: searchKeyword }
        // Check if token is present
        if (accessToken) {
          const userId = jwtDecode(accessToken).idUser;
          apiUrl = `${API_BASE_URL}/annoncesAccueilByUserKeywords`;
          body = { key: searchKeyword , userID: userId}
        }
        

        console.log(headers)
        

      const searchResponse = await axios.post(
        apiUrl,
        body,
        {headers}            
      );


      const searchResults = searchResponse.data.listAnnonces || [];
      
      setAnnonces(searchResults);
    } catch (error) {
      console.error('Failed to fetch search results', error);
      // Handle errors here
    }
  };
    return(
        <header>
        {/* <!-- Top-Header --> */}
        <div class="full-layer-outer-header">
            <div class="container clearfix">
                <nav>
                    <ul class="secondary-nav g-nav">
                        <li>
                            <a>Mon compte
                                <i class="fas fa-chevron-down u-s-m-l-9"></i>
                            </a>
                            {/* style="width:200px" */}
                            <ul class="g-dropdown" >
                                <li>
                                    <Link to="/fav">
                                        <i class="far fa-heart u-s-m-r-9"></i>
                                        Favoris
                                    
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/history">
                                        <i class="far fa-check-circle u-s-m-r-9"></i>
                                        Historiques
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/login">
                                        <i class="fas fa-sign-in-alt u-s-m-r-9"></i>
                                        Connexion/Deconnexion
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
        {/* <!-- Top-Header /- --> */}
        {/* <!-- Mid-Header --> */}
        <div class="full-layer-mid-header">
            <div class="container">
                <div class="row clearfix align-items-center">
                    <div class="col-lg-3 col-md-9 col-sm-6">

                    </div>
                    <div class="col-lg-6 u-d-none-lg">
                    <form className="form-searchbox" onSubmit={handleSearchSubmit}>
                        <label className="sr-only" htmlFor="search-landscape">
                            Rechercher
                        </label>
                        <input
                            id="search-landscape"
                            type="text"
                            className="text-field"
                            placeholder="Mots clés"
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                        />
                        <button
                            id="btn-search"
                            type="submit"
                            className="button button-primary fas fa-search"
                        ></button>
                    </form>
                    </div>

                </div>
            </div>
        </div>
        {/* <!-- Mid-Header /- --> */}
        {/* <!-- Responsive-Buttons --> */}
        <div class="fixed-responsive-container">
            <div class="fixed-responsive-wrapper">
                <button type="button" class="button fas fa-search" id="responsive-search"></button>
            </div>
            <div class="fixed-responsive-wrapper">
                <a href="wishlist.html">
                    <i class="far fa-heart"></i>
                    <span class="fixed-item-counter">4</span>
                </a>
            </div>
        </div>
        {/* <!-- Responsive-Buttons /- --> */}
        {/* <!-- Mini Cart --> */}

        {/* <!-- Mini Cart /- --> */}
        {/* <!-- Bottom-Header --> */}
        <div class="full-layer-bottom-header">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-3">
                    </div>
                    <div class="col-lg-9">
                        <ul class="bottom-nav g-nav u-d-none-lg">
                            <li>
                                 <Link to="/">
                                     Accueil
                                 </Link> 
                                    <span class="superscript-label-new">NEW</span>
                            </li>
                            <li>
                                 <Link to="/history">
                                     Historique de mes annonces
                                 </Link> 
                            </li>
                            <li>
                                 <Link to="/fav">
                                     Mes favoris
                                 </Link> 
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- Bottom-Header /- --> */}
    </header>
    )
}


export function HeaderBottom ({libelle}){
    return (
        <div class="page-style-c">
        <div class="container">
            <div class="page-intro">
                <h2>Annonces</h2>
                <ul class="bread-crumb">
                    <li class="has-separator">
                        <i class="ion ion-md-home"></i>
                        <a href="home.html">Accueil</a>
                    </li>
                    <li class="is-marked">
                        <a href="shop-v3-sub-sub-category.html">{libelle}</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    )
}