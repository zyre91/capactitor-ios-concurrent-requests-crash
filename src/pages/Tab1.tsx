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

  const [timesClicked, setTimesClicked] = useState<number>(0);

  async function loadFile() {
    const gltfLoader = new GLTFLoader();
    setTimesClicked((index) => index + 1);
    console.log("--------------------");
    console.log(timesClicked + " START loading gltf");
    gltfLoader.load(fileUrl, (gltf: GLTF) => {
      console.log(timesClicked + " DONE loading gltf");
      setGLTF(gltf);
    });

    const fetchFile = window.fetch(fileUrl);
    const timestamp = new Date().getTime();

    setRequests([...requests, { timestamp, promise: fetchFile }]);
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
