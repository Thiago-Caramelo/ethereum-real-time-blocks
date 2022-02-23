import * as React from "react";
import { useEffect, useState } from "react";
import { request, gql } from "graphql-request";
import { useQuery } from "react-query";
import { Block } from "./types/block";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

function useBlocks() {
  return useQuery("blocks", async () => {
    const {
      blocks: { data },
    } = await request(
      process.env.REACT_APP_GRAPHQL_SERVER!,
      gql`
        query {
          posts {
            data {
              id
              title
            }
          }
        }
      `
    );
    return data;
  });
}

export default function Blocks() {
  const [blocks, setBlocks] = useState<number[]>([]);

  useEffect(() => {
    const websocket = new WebSocket("ws://192.168.101.100:8546");
    websocket.onopen = () => {
      var message = {
        id: +new Date(),
        method: "eth_subscribe",
        params: ["newHeads"],
      };
      websocket.send(JSON.stringify(message));
    };
    websocket.onmessage = (event) => {
      const data: Block = JSON.parse(event.data);
      if (data?.params?.result?.number) {
        const blockNumber = parseInt(data.params.result.number);
        setBlocks((currentState) => {
          const newState = [...currentState];
          newState.push(blockNumber);
          return newState;
        });
      }
    };
  }, []);

  return (
    <Stack spacing={2}>
      {blocks.map((block) => {
        return (
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Block Number: {block}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Load transactions</Button>
            </CardActions>
          </Card>
        );
      })}
    </Stack>
  );
}
