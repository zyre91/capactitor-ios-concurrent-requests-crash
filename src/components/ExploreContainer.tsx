import "./ExploreContainer.css";
import { ListItemRequest } from "./ListItem";
import Canvas from "./Canvas";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

interface ContainerProps {
  name: string;
  gltf?: GLTF;
}

const ExploreContainer: React.FC<ContainerProps> = ({ gltf }) => {
  return (
    <div className="container explore-container">
      <Canvas gltf={gltf} />

      {/* <IonList>
          {requests &&
            requests.map((request) => (
              <ListItem key={request.timestamp} request={request} />
            ))}
        </IonList> */}
    </div>
  );
};

export default ExploreContainer;
