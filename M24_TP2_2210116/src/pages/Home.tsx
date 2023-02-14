import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ProduitsListe from '../components/ProduitsListe';
import './Home.css';




const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>        
        <IonToolbar color="secondary">
          {/* <IonIcon slot='start' icon={cart}></IonIcon> */}
          <IonTitle>Ma Boutique Mobile</IonTitle>
          <IonButton slot="end" color="success" routerLink='/localstorage1'>LS1</IonButton>
          <IonButton slot="end" color="success" routerLink='/todos'>ToDos</IonButton>
        </IonToolbar >
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar color="success">
            <IonTitle size="large">
              Ma Boutique Mobile
              
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* Appel du component */}
        <ProduitsListe />
      </IonContent>
    </IonPage>
  );
};

export default Home;
