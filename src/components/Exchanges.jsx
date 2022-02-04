import React from "react";
import millify from "millify";
import { Row, Col, Typography, Avatar } from "antd";
import HTMLReactParser from "html-react-parser";

import { useGetExchangesQuery } from "../services/cryptoApi";
import Loader from "./Loader";

const { Text } = Typography;

// const color = 24hVolume;

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();
  const exchangesList = data?.data?.exchanges;
  // Note: To access this endpoint you need premium plan
  if (isFetching) return <Loader />;

  // const volume = millify(`${exchangesList}.24hVolume`);

  // console.log(volume);
  return (
    <>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Change</Col>
      </Row>

      {exchangesList.map((exchange) => (
        <Row
          key={exchange.uuid}
          style={{
            padding: "10px",
            border: "1px solid #000",
            margin: "5px 0",
            borderRadius: "5px",
          }}
        >
          <Col span={6}>
            <Text>
              <strong>{exchange.rank}.</strong>
            </Text>
            <Avatar className="exchange-image" src={exchange.iconUrl} />
            <Text>
              <strong>{exchange.name}</strong>
            </Text>
          </Col>
          <Col span={6}>${millify(exchange.price)}</Col>
          <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
          <Col span={6}>{millify(exchange.btcPrice)}%</Col>
          {HTMLReactParser(exchange.description || "")}
        </Row>
      ))}
    </>
  );
};

export default Exchanges;
