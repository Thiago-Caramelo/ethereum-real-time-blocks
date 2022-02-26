import * as React from "react";
import { useEffect, useState } from "react";
import { request, gql } from "graphql-request";
import { useQuery } from "react-query";
import { Block } from "./types/block";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

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
    const websocket = new WebSocket(process.env.REACT_APP_WS_SERVER!);
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
    return () => websocket.close();
  }, []);

  return (
    <>
      <Stack spacing={2}>
        {blocks.map((block) => {
          return (
            <Card key={block}>
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
                <Link to={`/blocks/${block}/transactions`}>
                  View transactions
                </Link>
              </CardActions>
            </Card>
          );
        })}
      </Stack>
      <Box sx={{ textAlign: "center" }} mt={"2rem"}>
        <CircularProgress size={"1em"} />
      </Box>
    </>
  );
}
