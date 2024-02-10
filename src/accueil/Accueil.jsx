import Filtre from "./Filtre";
import ListeAnnonce from "./ListeAnnonce";

export default function AccueilBody({
  dataLoaded,
  modeles,
  categories,
  marques,
  carburants,
  annonces,
  setAnnonces,
  order,
  setOrder,
  fetchData
}) {


  return (
    <div className="row">
      {dataLoaded && (
        <Filtre
          modeles={modeles}
          categories={categories}
          marques={marques}
          carburants={carburants}
          setAnnonces={setAnnonces}
          order={order}
        />
      )}
      <ListeAnnonce annonces={annonces} setOrder ={setOrder} fetchData = {fetchData}/>
    </div>
  );
}
