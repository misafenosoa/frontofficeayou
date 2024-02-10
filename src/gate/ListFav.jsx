import React from "react";
import Header, { HeaderBottom } from "../components/header/Header";
import ListModels from "../listModels/ListModels";
import Pagination from "../components/pagination/Pagination";
import Search from "../components/seach/Search";

export default function ListFav() {


    return (
        <div className="">
            <Header />
            <HeaderBottom libelle={'Liste des favoris'} />
            <div className="page-shop u-s-p-t-80">
                <div className="container">
                    <div className="row product-container list-style">
                        <ListModels  />
                    </div>
                </div>
            </div>

            <Pagination />
            <Search />
        </div>
    );
}
