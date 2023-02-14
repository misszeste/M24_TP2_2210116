import React, { useState, useEffect } from "react";
import { IonButton, IonCard, IonCardTitle, IonContent, IonIcon, IonImg, IonItem, IonLabel, IonList, IonText, IonTitle } from "@ionic/react";
import { cartOutline, trashOutline } from "ionicons/icons";

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
    },[]);

    
    {/* fonction btn ajouterPanier */}
    const ajouterPanier = (produit: {id:number, title:string, price: string, description:string, category:string, image:string}) => {
        // console.log("Le produit a été ajouté au panier");

        if(!panier.includes(produit)){
        // ... veux dire tout ce qui est dans le panier
        setPanier([...panier,produit]);
        }else{
            // Pourrait avoir un compteur et incrémenté ici
            alert('Le produit est déjà dans le panier')
        }
    }  
    

    {/* fonction btn viderPanier */}
    const viderPanier = () => {
        setPanier([]);
    }


    {/* fonction enleverPanierItem  */}
    const enleverPanierItem = ( produitId: number) => {
        // Enlever un item du panier
        setPanier([]);
    }

    {/* fonction calcul total prix de la facture */}
    const panierTotal = panier.reduce((total,item) => parseFloat(total +  item.price),0);
   
    return(
        <IonContent>
            {/* Liste d'item dans le panier */}
            <IonList>
             

                {/* panier .map */}
                {panier.map((produit, index) => (
                    <IonItem color="warning" key={index}>
                        <IonLabel>{produit.title}</IonLabel>
                        <IonLabel slot="end">{parseFloat(produit.price).toFixed(2)} $ </IonLabel>
                        <IonIcon slot="end" icon={trashOutline} onClick={() => enleverPanierItem(produit.id)}></IonIcon>               

                    </IonItem>
                ))}

            <IonTitle>
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
                <IonTitle >Produits</IonTitle>
                {/* .map */}
                {produits.map((produit,index)=> (
                    <IonCard key={index}>
                        <IonCardTitle>{produit.title}</IonCardTitle>
                        <p> Catégorie: {produit.category}</p>
                        <IonImg src={produit.image}/>
                        <p>Description : {produit.description}</p>
                        <IonLabel>Prix : {(produit.price).toFixed(2)} $ </IonLabel> <br/>
                     
                        <IonButton onClick={() => ajouterPanier(produit)}> Ajouter au panier </IonButton>
                    </IonCard>
                ))}                
            </IonList>
        </IonContent>
  
    );    
};
export default ProduitsListe;