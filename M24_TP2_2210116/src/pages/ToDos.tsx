import React, { useEffect, useState } from "react";
import { IonBackButton, IonButton, IonButtons, IonCheckbox, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { addOutline, trashOutline } from "ionicons/icons";
const ToDos: React.FC = () => {

  
const [todos,setTodos] = useState([] as any[]);
const [nouveauTodo, setNouveauTOdo] = useState('');
const [showModal, setShowModal] = useState(false);

useEffect(() => {
    const todosStocker = localStorage.getItem('todos');
    if(todosStocker){
        setTodos(JSON.parse(todosStocker));
    }
},[]);

// Methode pour ajouter todo todo
const ajouterToDo = () => {
    if(nouveauTodo !== ''){
        const todo = {
            text: nouveauTodo,
            completed : false,
        };
        setTodos([...todos, todo]);
        setNouveauTOdo('');

        // Save la liste de todos
        localStorage.setItem('todos',JSON.stringify([...todos,todo]));
        setShowModal(false);
    }
};

// Methode pour supprimer todo
const supprimerToDo = (index:number) => {
   const todoAjour = [...todos];
   todoAjour.splice(index,1);
   setTodos(todoAjour);
   localStorage.setItem('todos',JSON.stringify(todoAjour));

};

const markCompleted = (index: number) => {
    const todoAjour = [...todos];
    todoAjour[index].completed = !todoAjour[index].completed;
    setTodos(todoAjour);
    localStorage.setItem('todos',JSON.stringify(todoAjour)); //local storage

}


    return(
        <IonPage className="localStorage">
            <IonHeader>        
                <IonToolbar color="secondary">
                    {/* <IonIcon slot='start' icon={cart}></IonIcon> */}
                    <IonButtons slot="end">
                        <IonBackButton defaultHref="/home"></IonBackButton>
                    </IonButtons>
                    <IonTitle>Liste ToDos</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={() => setShowModal(true)}>
                            <IonIcon slot="icon-only" icon={addOutline} />
                        </IonButton>
                    </IonButtons>               
                </IonToolbar >
            </IonHeader>
            <IonContent fullscreen>
                <IonList>
                    {todos.map((todo: any, index: number) => (
                        <IonItem key={index} style={{textDecoration: todo.completed ? 'line-through' : 'none'}}>
                            <IonCheckbox slot="start" checked={todo.completed} onClick={() => markCompleted(index) }/>
                            <IonLabel>{todo.text}</IonLabel>
                            <IonButton onClick={() => supprimerToDo(index)} slot="end">
                                <IonIcon icon={trashOutline}/>
                            </IonButton>
                        </IonItem>
                    ))}

                </IonList>                
            </IonContent> 
            <IonModal isOpen={showModal} onDidDismiss={()=> setShowModal(false)}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Àjouter un nouveau ToDo</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={() => setShowModal(false)}>Fermer</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>

                <IonContent>
                    <IonList>
                        <IonItem>
                            <IonLabel position="floating">Todo</IonLabel>
                            <IonInput value={nouveauTodo} onIonChange={(e) => setNouveauTOdo(e.detail.value!)}></IonInput>                            
                        </IonItem>
                    </IonList>
                    <IonButton expand="block" onClick={ajouterToDo}>Ajouter ToDo</IonButton>
                </IonContent>
            </IonModal>
        </IonPage>
    );
};

export default ToDos;
