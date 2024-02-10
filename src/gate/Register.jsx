import Footer from "../components/footer/Footer";
import Header, { HeaderBottom } from "../components/header/Header";

export default function Register() {
 
    return (
        <div className="">
        <Header />

        <HeaderBottom/>
        <div class="page-shop u-s-p-t-80">
            <div class="container">
                <div class="row">
                <div class="col-lg-12">
                    <div class="reg-wrapper">
                        <h2 class="account-h2 u-s-m-b-20">S'inscrire</h2>
                        <form>
                            <div class="u-s-m-b-30">
                                <label className="loglabel">Nom
                                    <span class="astk">*</span>
                                </label>
                                <input type="text" id="user-name" class="text-field" placeholder="Nom"/>
                            </div>
                            <div class="u-s-m-b-30">
                                <label className="loglabel">Prenom
                                    <span class="astk">*</span>
                                </label>
                                <input type="text" id="user-name" class="text-field" placeholder="Prenom"/>
                            </div>
                            <div class="u-s-m-b-30">
                                <label className="loglabel">Email
                                    <span class="astk">*</span>
                                </label>
                                <input type="text" id="email" class="text-field" placeholder="Email"/>
                            </div>
                            <div class="u-s-m-b-30">
                                <label className="loglabel">Mot de passe
                                    <span class="astk">*</span>
                                </label>
                                <input type="text" id="password" class="text-field" placeholder="Mot de passe"/>
                            </div>

                            <div class="u-s-m-b-45">
                                <button class="button button-primary w-100">S'inscrire</button>
                            </div>
                        </form>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <Footer/>

    </div>
    )
}