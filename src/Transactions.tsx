import * as React from "react";
import { request, gql } from "graphql-request";
import { useQuery } from "react-query";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";

type Hash = {
  hash: string;
};

type Block = {
  block: {
    transactions: Hash[];
  };
};

export default function Transactions() {
  const params = useParams<{ id: string }>();
  const block = params.id!;
  const queryResult = useQuery<Block>(["blocks", block], async () => {
    const response = await request(
      process.env.REACT_APP_GRAPHQL_SERVER!,
      gql`
        query getBlock($number: Long!) {
          block(number: $number) {
            transactions {
              hash
            }
          }
        }
      `,
      {
        number: block,
      }
    );
    return response;
  });
  return (
    <>
      {queryResult.data?.block.transactions.map(({ hash }) => {
        return (
          <Box mt={"1rem"}>
            <Card key={hash}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Transaction Hash : {hash}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        );
      })}
    </>
  );
}
