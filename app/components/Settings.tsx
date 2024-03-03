"use client";
import React, { useState, useEffect } from "react";
import {
  TextInput,
  Button,
  Paper,
  Title,
  Container,
  Group,
} from "@mantine/core";

import CryptoJS from "crypto-js";

const WalletSignIn = () => {
  const [user, setUser] = useState("");
  // Binance
  const [binanceKey, setBinanceKey] = useState("");
  const [binanceSecret, setBinanceSecret] = useState("");
  // Kraken
  const [krakenKey, setKrakenKey] = useState("");
  const [krakenSecret, setKrakenSecret] = useState("");
  // Bybit
  const [bybitKey, setBybitKey] = useState("");
  const [bybitSecret, setBybitSecret] = useState("");

  // Detect Rainbow Wallet Ethereum provider
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts: string[]) => {
          // Assuming the first account is the user's account
          setUser(accounts[0]);
        })
        .catch((err: any) => {
          console.error(err);
          alert("Please sign in using Rainbow Wallet");
        });
    } else {
      alert("Please install Rainbow Wallet");
    }
  }, []);

  const encryptAndSaveKeys = () => {
    const keysObject = {
      Binance: {
        key: CryptoJS.AES.encrypt(binanceKey, "secret key phrase").toString(),
        secret: CryptoJS.AES.encrypt(
          binanceSecret,
          "secret key phrase"
        ).toString(),
      },
      Kraken: {
        key: CryptoJS.AES.encrypt(krakenKey, "secret key phrase").toString(),
        secret: CryptoJS.AES.encrypt(
          krakenSecret,
          "secret key phrase"
        ).toString(),
      },
      Bybit: {
        key: CryptoJS.AES.encrypt(bybitKey, "secret key phrase").toString(),
        secret: CryptoJS.AES.encrypt(
          bybitSecret,
          "secret key phrase"
        ).toString(),
      },
    };

    localStorage.setItem("apiKeys", JSON.stringify(keysObject));
    alert("Keys and secrets saved successfully!");
  };

  if (!user) {
    return <div>Please sign in using your Ethereum wallet.</div>;
  }

  const handleClearKeys = () => {
    localStorage.removeItem("apiKeys"); // Clear the keys from localStorage
    alert("API keys and secrets cleared successfully!"); // Provide feedback
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    encryptAndSaveKeys();
  };

  return (
    <Container size="sm" my={40}>
      <Paper shadow="sm" p="md" withBorder className="space-y-4">
        <Title order={2} className="text-center">
          API Key and Secret Submission
        </Title>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <TextInput
            label="Binance API Key"
            placeholder="Enter your Binance API Key"
            value={binanceKey}
            onChange={(e) => setBinanceKey(e.currentTarget.value)}
          />
          <TextInput
            label="Binance Secret"
            placeholder="Enter your Binance Secret"
            value={binanceSecret}
            onChange={(e) => setBinanceSecret(e.currentTarget.value)}
          />
          <TextInput
            label="Kraken API Key"
            placeholder="Enter your Kraken API Key"
            value={krakenKey}
            onChange={(e) => setKrakenKey(e.currentTarget.value)}
          />
          <TextInput
            label="Kraken Secret"
            placeholder="Enter your Kraken Secret"
            value={krakenSecret}
            onChange={(e) => setKrakenSecret(e.currentTarget.value)}
          />
          <TextInput
            label="Bybit API Key"
            placeholder="Enter your Bybit API Key"
            value={bybitKey}
            onChange={(e) => setBybitKey(e.currentTarget.value)}
          />
          <TextInput
            label="Bybit Secret"
            placeholder="Enter your Bybit Secret"
            value={bybitSecret}
            onChange={(e) => setBybitSecret(e.currentTarget.value)}
          />
          <Group position="right" mt="md">
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white"
            >
              Save Keys and Secrets
            </Button>
            <Button color="red" onClick={handleClearKeys} type="button">
              Clear Keys and Secrets
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
};

export default WalletSignIn;
