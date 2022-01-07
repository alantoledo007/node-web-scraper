import axios from "axios";
import cheerio from "cheerio";
import express from "express";
import dotenv from "dotenv";
import { Builder, By, Key, until } from "selenium-webdriver";
dotenv.config();

const sessionid = "48771782467%3A27GUND3IkuPbqs%3A9";

const { PORT } = process.env;

const server = express();

server.get("/", async (req, res) => {
  axios
    .get("https://instagram.com/donads.ok?__a=1", {
      headers: {
        cokies: `sessionid=${sessionid}`,
      },
    })
    .then((r) => {
      console.log("instagram response:::", r.data.graphql.user);
      res.send("ok").status(200).end();
    });
});

server.get("/webdriver", async (req, res) => {});

server.listen(PORT, () => {
  console.log(`Scraper working at http://localhost:${PORT}`);
});
