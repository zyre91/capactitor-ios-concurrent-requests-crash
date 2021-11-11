import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import { ListItem, ListItemRequest } from "../components/ListItem";
import "./Tab2.css";

const fileUrl = "/assets/BoomBox.glb";

const Tab2: React.FC = () => {
  const [requests, setRequests] = useState<ListItemRequest[]>([]);

  function newestFirst(requestA: ListItemRequest, requestB: ListItemRequest) {
    return requestB.timestamp - requestA.timestamp;
  }

  async function loadFile() {
    const fetchFile = window.fetch(fileUrl);
    const timestamp = new Date().getTime();
    setRequests([...requests, { timestamp, promise: fetchFile }]);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle slot="start">Tab 2</IonTitle>
          <IonButton slot="end" onClick={loadFile}>
            Load object
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {requests.sort(newestFirst).map((request) => (
            <ListItem key={request.timestamp} request={request} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
