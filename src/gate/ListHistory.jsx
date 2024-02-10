import Header, { HeaderBottom } from "../components/header/Header";
import Pagination from "../components/pagination/Pagination";
import Search from "../components/seach/Search";
import ListModelsHistory from "../listModels/ListModelsHistory";


export default function ListHistory() {
 
    return (
        <div className="">
        <Header  />
        <HeaderBottom libelle={'Liste de mes annonces'}/>
        <div class="page-shop u-s-p-t-80">
            <div class="container">
                <div class="row product-container list-style">
                    <ListModelsHistory/>
                 </div>
            </div>
        </div>

        <Pagination/>

        <Search/>
    </div>

    )    
}