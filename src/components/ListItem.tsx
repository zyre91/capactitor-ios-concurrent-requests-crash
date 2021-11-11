import { IonItem, IonLabel } from "@ionic/react";
import React, { Suspense, FC, useEffect, useState } from "react";

export type ListItemRequest = { timestamp: number; promise: Promise<Response> };

type ListItemProps = {
  request: ListItemRequest;
};

export const ListItem: FC<ListItemProps> = ({ request }) => {
  const [status, setStatus] = useState<"DONE" | "PENDING" | "FAILED">(
    "PENDING"
  );
  const [data, setData] = useState<string>();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await request.promise;
        if (data.status === 200) {
          setStatus("DONE");
          const blob = await data.blob();
          const someText = await blob.text();
          setData(someText);
        } else {
          throw new Error("Error");
        }
      } catch (err) {
        setStatus("FAILED");
      }
    }
    fetchData();
  }, []);

  return (
    <IonItem>
      <IonLabel
        data-text={data}
      >{`time: ${request.timestamp} status: ${status}`}</IonLabel>
    </IonItem>
  );
};
