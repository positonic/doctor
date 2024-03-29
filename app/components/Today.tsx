"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useFetchTrades } from "../hooks/fetchTrades";
import { getStartOfYesterdayTimestamp } from "@/utils";
import { TradeResponseData } from "@/pages/api/TradeResponseData";
import Positions from "./Positions";
import Orders from "./Orders";
import Signin from "./Signin";
// Import useAccount from wagmi instead of RainbowKit
import { useAccount } from "wagmi";
import Settings from "./Settings";
import { useExchangeManager } from "../hooks/exchangeManager";

const MarketContent = () => {
  const startTimestamp = getStartOfYesterdayTimestamp();
  const [data, error] = useFetchTrades(startTimestamp);
  // Use the useAccount hook from wagmi to check wallet connection

  if (error) {
    return <div>Error: {error}</div>;
  }

  // If not connected, render the Signin component

  // Render the content if the user's wallet is connected
  return (
    <div>
      {data && data.positions && (
        <>
          <h3>Positions</h3>
          <Positions positions={data.positions} />
        </>
      )}
      {data && data.positions && (
        <>
          <h3>Orders</h3>
          <Orders orders={data.orders} />
        </>
      )}
    </div>
  );
};

export default function Today() {
  //const [isSettingsSaved, setIsSettingsSaved] = useState(false);
  const { isConnected } = useAccount();
  const [isSettingsSaved] = useExchangeManager();

  if (!isConnected) {
    return <Signin />;
  }

  return (
    <div className="container mx-auto">
      <h1>Today</h1>
      <Suspense fallback={<div>Loading...</div>}>
        {isSettingsSaved && <MarketContent />}
        {!isSettingsSaved && <Settings />}
      </Suspense>
    </div>
  );
}
