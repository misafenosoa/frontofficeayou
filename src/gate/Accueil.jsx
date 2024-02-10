import axios from "axios";
import AccueilBody from "../accueil/Accueil";
import Header, { HeaderBottom } from "../components/header/Header";
import API_BASE_URL from "../Config";
import { useEffect, useState } from "react";
import {jwtDecode} from 'jwt-decode'
import Search from "../components/seach/Search";
import {  useNavigate } from "react-router-dom";
export default function Accueil() {
    const [annonces, setAnnonces] = useState([]);
    const [modeles, setModeles] = useState([]);
    const [marques, setMarques] = useState([]);
    const [categories, setCategories] = useState([]);
    const [carburants, setCarburants] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [order,setOrder] = useState('desc')
    const nav = useNavigate()
    const handleUnauthorized = () => {
      // Détruisez le token et redirigez vers la page de connexion
      localStorage.removeItem('accessToken');
      nav('/');
    };
    useEffect(() => {
      fetchData();
    }, []);
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const headers = {
          Authorization: `${accessToken}`,
        };
  
        let apiUrl = `${API_BASE_URL}/annoncesAccueil`;
  
        // Check if token is present
        if (accessToken) {
          const userId = jwtDecode(accessToken).idUser;
          apiUrl = `${API_BASE_URL}/annoncesAccueilByUser/${userId}`;
        }
  
  
        // Fetch annonces
        const annoncesResponse = await axios.get(apiUrl, { headers });
        console.log(annoncesResponse)
        const annoncesData = annoncesResponse.data.listAnnonces || [];
        setAnnonces(annoncesData);
  
        // Fetch modeles
        const modelesResponse = await axios.get(`${API_BASE_URL}/modeles`, { headers });
        const modelesData = modelesResponse.data.listModeles || [];
        setModeles(modelesData);
  
        // Fetch marques
        const marquesResponse = await axios.get(`${API_BASE_URL}/marques`, { headers });
        const marquesData = marquesResponse.data.listMarque || [];
        setMarques(marquesData);
  
        // Fetch categories
        const categoriesResponse = await axios.get(`${API_BASE_URL}/categories`, { headers });
        const categoriesData = categoriesResponse.data.listCategorie || [];
        setCategories(categoriesData);
  
        // Fetch carburants
        const carburantsResponse = await axios.get(`${API_BASE_URL}/carburants`, { headers });
        const carburantsData = carburantsResponse.data.listCarburant || [];
        setCarburants(carburantsData);
  
        setDataLoaded(true);
      } catch (error) {
        console.error('Failed to fetch data', error);
        if (error.response && error.response.status === 401) {
          handleUnauthorized()
      }
        // Gérer les erreurs de requête ici
      }
    };
  
    const handleSearchChange = async (e) => {
        const searchKeyword = e.target.value;
        try {
          const accessToken = localStorage.getItem("accessToken");
          const headers = {
            Authorization: `${accessToken}`,
          };
    
          // Fetch search results based on the searchKeyword
          const searchResponse = await axios.post(
            `${API_BASE_URL}/annoncesAccueilKeyWord`,
            { key: searchKeyword },
            { headers }
          );
    
          const searchResults = searchResponse.data.listAnnonces || [];
          setAnnonces(searchResults);
        } catch (error) {
          console.error("Failed to fetch search results", error);
          // Handle errors here
        }
      };
    return (
        <div className="">
            <Header setAnnonces={setAnnonces} />

            <HeaderBottom libelle={'Annonces'}/>
            <div class="page-shop u-s-p-t-80">
                <div class="container">
                    <div class="row">
                        {/* Pass the necessary data as props to AccueilBody */}
                        <AccueilBody
                            dataLoaded={dataLoaded}
                            modeles={modeles}
                            categories={categories}
                            marques={marques}
                            carburants={carburants}
                            annonces={annonces}
                            setAnnonces={setAnnonces}
                            order= {order}
                            setOrder ={setOrder}
                            fetchData = {fetchData}
                        />
                    </div>
                    
                </div>
            </div>

            <Search handleSearchChange={handleSearchChange} />
        </div>
    )
}