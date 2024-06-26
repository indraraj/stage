import React from "react";
import { Image } from "@chakra-ui/react";

import mongoDB from "../assets/MongoDB.png";
import cassandra from "../assets/Cassandra.png";
import mySql from "../assets/my-sql.png";
import postgreSql from "../assets/PostgreSQL.png";
import sqlServer from "../assets/sql-server.png";
import apachePulsar from "../assets/MongoDB.png";
import rocketMq from "../assets/apachePulsar.png";
import eventHub from "../assets/Azure-event-hub.png";
import pubsub from "../assets/G_pubsub.png";
import rabbitMq from "../assets/RabbitMQ.png";
import natsStreaming from "../assets/NATS_stream.png";
import kafka from "../assets/Apache_kafka.png";
import infinispan from "../assets/infinispan.png";
import pubsubLite from "../assets/pub-sub-lite.png";
import pravega from "../assets/pravega.webp";

interface DataNodeImageProps {
  connectorType: string;
}

const DataNodeImage: React.FC<DataNodeImageProps> = ({ connectorType }) => {
  let src = "";

  switch (true) {
    case connectorType.includes("mongo"):
      src = mongoDB;
      break;
    case connectorType.includes("postgre"):
      src = postgreSql;
      break;
    case connectorType.includes("cassandra"):
      src = cassandra;
      break;
    case connectorType.includes("mysql"):
      src = mySql;
      break;
    case connectorType.includes("sqlserver"):
      src = sqlServer;
      break;
    case connectorType.includes("apachepulsar"):
      src = apachePulsar;
      break;
    case connectorType.includes("rocketmq"):
      src = rocketMq;
      break;
    case connectorType.includes("eventhub"):
      src = eventHub;
      break;
    case connectorType.includes("pubsub"):
      src = pubsub;
      break;
    case connectorType.includes("raabbitmq"):
      src = rabbitMq;
      break;
    case connectorType.includes("natsstreaming"):
      src = natsStreaming;
      break;
    case connectorType.includes("kafka"):
      src = kafka;
      break;
    case connectorType.includes("infinispan"):
      src = infinispan;
      break;
    case connectorType.includes("pubsublite"):
      src = pubsubLite;
      break;
    case connectorType.includes("pravega"):
      src = pravega;
      break;
    default:
      src = "";
      break;
  }

  return <Image boxSize={14} objectFit="fill" src={src} alt={connectorType} />;
};

export default DataNodeImage;
