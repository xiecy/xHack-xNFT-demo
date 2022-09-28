import ReactXnft, { Text, View, List, ListItem, Button, usePublicKey, useConnection } from "react-xnft";
import React from "react";
import { Transaction, SystemProgram, PublicKey } from "@solana/web3.js";

//
// On connection to the host environment, warm the cache.
//
ReactXnft.events.on("connect", () => {
  // no-op
});

// source: https://getchange.io/donate
const listOfCharities = [
  {
    name: "Girls Who Code",
    url: "https://girlswhocode.com/",
    address: "HDKeqLLiXGbSvLxDcFdLodTVSGS47TCYiYgWWt1YNav6",
  },
  {
    name: "World Wildlife Fund",
    url: "https://www.worldwildlife.org/",
    address: "9H86sbTRTqempctCYj4Kqjurwda3X6YeJuNPgPY9mxuC",
  },
  {
    name: "American Cancer Society",
    url: "https://www.cancer.org/",
    address: "CM4e4cBaX99Krz1Reit7xXxga3FSRGdeg7HtwT8L2zMQ",
  },
];

export function App() {
  const publicKey = usePublicKey();
  const connection = useConnection();

  const onClickOnListItem = async (c: any) => {
    // send donation transaction
    const ix = SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: new PublicKey(c.address),
      lamports: 0.0001 * 1_000_000_000,
    });
    const tx = new Transaction();
    tx.add(ix);

    const res = await window.xnft.send(tx);
    console.log(res);
  }

  return (
    <View>
      <Text style={{ color: "black", padding: "20px" }}>Donate 1 SOL</Text>
      <List>
        {listOfCharities.map((c) => {
          return (
            <ListItem style={{ height: "80px" }} key={c.address}>
              <View>
                <Text>
                  {c.name}
                </Text>
                <Button style={{ backgroundColor: "green" }} onClick={() => onClickOnListItem(c)}>
                  Donate
                </Button>
              </View>
            </ListItem>
          )
        })}
      </List>
    </View>
  );
}
