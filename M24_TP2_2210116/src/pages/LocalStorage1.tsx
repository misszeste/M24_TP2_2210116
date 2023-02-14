import React, { useState } from "react";
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
const LocalStorage1: React.FC = () => {

    // déclaration variable   
    const [maValeur,setMaValeur] = useState<string>('');

    // Methode pour sauvegarder dans le state
    const handleSave = () => {
        localStorage.setItem( "maValeur", maValeur);
    }

    // Methode pour charger dans le state
    const handleLoad = () => {
        const valeurStocker = localStorage.getItem("maValeur");
        const valeurAttribuer = valeurStocker !== null ? valeurStocker: '';
        setMaValeur(valeurAttribuer);
    }

     // Methode pour vider dans le state
     const handleVider = () => {
        localStorage.clear();
        setMaValeur('');
    }
    

    return(
        <IonPage className="localStorage">
            <IonHeader>        
                <IonToolbar color="secondary">
                    {/* <IonIcon slot='start' icon={cart}></IonIcon> */}
                    <IonTitle>Local Storage</IonTitle>
                    <IonButton slot="end" color="success" routerLink='/home'>Retour</IonButton>
                </IonToolbar >
            </IonHeader>
            <IonContent fullscreen>
                <div>
                    <h5> Charger ou Enregistrer une valeur </h5>
                    <input className="inputLs1" value={maValeur} onChange={e => setMaValeur(e.target.value)}/>
                </div>
                <IonButton className="btnEnregistrerLs1" onClick={handleSave}>Enregistrer</IonButton>
                <IonButton className="btnChargerLs1"onClick={handleLoad}>Charger</IonButton>
                <IonButton className="btnViderLs1"onClick={handleVider}>Vider Storage</IonButton>
                <div>
                    <h3> Valeur: {maValeur}</h3>
                </div>            
            </IonContent> 
        </IonPage>
    );
};

export default LocalStorage1;
