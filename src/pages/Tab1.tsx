import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import ExploreContainer from "../components/ExploreContainer";
import { ListItemRequest } from "../components/ListItem";
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import "./Tab1.css";

const fileUrl = "/assets/BoomBox.glb";

const Tab1: React.FC = () => {
  const [requests, setRequests] = useState<ListItemRequest[]>([]);
  const [GTLF, setGLTF] = useState<GLTF>();

  async function loadFile() {
    const gltfLoader = new GLTFLoader();
    console.log("--------------------");
    console.log("START loading gltf");
    gltfLoader.load(fileUrl, (gltf: GLTF) => {
      console.log("DONE loading gltf");
      setGLTF(gltf);
    });

    const fetchFile = window.fetch(fileUrl);
    const timestamp = new Date().getTime();
    // setTimeout(() => {
    //   let requestsCopy = [...requests];
    //   requestsCopy = requestsCopy.filter(
    //     (request) => request.timestamp !== timestamp
    //   );
    //   setRequests(requestsCopy);
    // }, 5000);
    setRequests([...requests, { timestamp, promise: fetchFile }]);
  }

  function newestFirst(requestA: ListItemRequest, requestB: ListItemRequest) {
    return requestB.timestamp - requestA.timestamp;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle slot="start">Tab 1</IonTitle>
          <IonButton slot="end" onClick={loadFile}>
            Load object
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer gltf={GTLF} name="Tab 1 page" />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
