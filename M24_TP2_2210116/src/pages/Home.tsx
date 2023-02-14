import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ProduitsListe';
import './Home.css';




const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        
        <IonToolbar color="secondary">
          {/* <IonIcon slot='start' icon={cart}></IonIcon> */}
          <IonTitle>Ma Boutique Mobile</IonTitle>
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
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
