import React, { useState, useEffect } from "react";
import { IonButton, IonCard, IonCardTitle, IonContent, IonIcon, IonImg, IonItem, IonLabel, IonList, IonText, IonTitle } from "@ionic/react";
import { cartOutline, trashOutline } from "ionicons/icons";

// Importation du css relié a la page 
import './ProduitsListe.css';


const ProduitsListe: React.FC = () => {

    // déclaration variable
    const [produits,setProduits] = useState<any[]>([]);
    const [panier,setPanier] = useState<{
        id: number,
        title: string,
        price: string,
        description:string,
        category: string,
        image: string
    }[]>([]);
    
    useEffect(()=> {
        async function fetchData(){
            const res= await fetch('https://fakestoreapi.com/products');
            const data = await res.json();
            setProduits(data);
        }
        fetchData();    

        //Localstorage
        const produitConteneur = localStorage.getItem("panier")

        if(produitConteneur){
            setPanier(JSON.parse(produitConteneur));
        }



    },[]);

    
    {/* fonction ajouterPanier */}
    const ajouterPanier = (produit: {id:number, title:string, price: string, description:string, category:string, image:string}) => {
    

        if(!panier.includes(produit)){

        // ... veux dire tout ce qui est dans le panier
        setPanier([...panier,produit]);
        //LocalStorage
        localStorage.setItem("panier", JSON.stringify([...panier, produit]));
        }else{
            // Pourrait avoir un compteur et incrémenté ici
            alert('Ce produit est déjà dans le panier')
        }
    }  
    
    {/* fonction viderPanier completement */}
    const viderPanier = () => {
        setPanier([]);
        //localStorage
        localStorage.setItem("panier", "");
    }


    {/* fonction enleverPanierItem  */}
    const enleverPanierItem = ( index: number) => {
        // Enlever un item du panier
        if(panier.length > 0){
            setPanier( panier.filter(item => item.id !== index));
             //localStorage
            const panierMaj = [...panier];
            panierMaj.splice(index, 1);
            setPanier(panierMaj);
            localStorage.setItem("panier", JSON.stringify(panierMaj));
        }
    }

    {/* fonction calcul total prix de la facture */}
    const panierTotal = panier.reduce((total,item) => parseFloat(total +  item.price),0);
   
    return(
        <IonContent>
            {/* Liste d'item dans le panier */}
            <IonList color="dark">
             

                {/* panier .map */}
                {panier.map((produit, index) => (
                    <IonItem color="warning" key={index}>
                        <IonLabel>{produit.title}</IonLabel>
                        <IonLabel slot="end">{parseFloat(produit.price).toFixed(2)} $ </IonLabel>
                        <IonIcon slot="end" icon={trashOutline} onClick={() => enleverPanierItem(index)}></IonIcon>               

                    </IonItem>
                ))}

                <IonTitle >
                    <IonItem>
                        <IonIcon slot="start" icon={cartOutline}></IonIcon>
                        <IonLabel slot="start">{panierTotal > 0 ? "Total: " +  panierTotal.toFixed(2) + "$" : ""}</IonLabel>
                        <IonText slot="end">{panier.length}</IonText>
                        <IonIcon slot="end" icon={trashOutline} onClick={() => viderPanier()}></IonIcon>
                    </IonItem>
                </IonTitle>
            </IonList>
            <br/>
            <IonList>
                <IonTitle className="panier-titre">Liste des produits disponibles </IonTitle>
                {/* .map */}
                {produits.map((produit,index)=> (
                    <IonCard className="produit-card" key={index}>
                        <IonCardTitle>{produit.title}</IonCardTitle>
                        <p> Catégorie: {produit.category}</p>
                        <IonImg className="produit-img" src={produit.image}/>
                        <p>Description : {produit.description}</p>
                        <IonLabel>Prix : {(produit.price).toFixed(2)} $ </IonLabel> <br/>
                     
                        <IonButton className="btnAjouter" onClick={() => ajouterPanier(produit)}> Ajouter au panier </IonButton>
                    </IonCard>
                ))}                
            </IonList>
        </IonContent>
  
    );    
};
export default ProduitsListe;