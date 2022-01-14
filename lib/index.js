import axios from "axios";
import cheerio from "cheerio";
import express from "express";
import dotenv from "dotenv";
//import { Builder, By, Key, until } from "selenium-webdriver";
dotenv.config();

const { PORT } = process.env;

const server = express();

server.get("/", async (req, res) => {
  const { username, sessionid } = req.query;

  axios
    .get(`https://instagram.com/${username}?__a=1`, {
      headers: {
        cokies: `sessionid=${sessionid}`,
      },
    })
    .then((r) => {
      const user = r.data.graphql.user;
      const data = {};
      data.biography = user.biography;
      data.fbid = user.fbid;
      data.following = user.edge_follow.count;
      data.followers = user.edge_followed_by.count;
      data.fullname = user.full_name;
      data.id = user.id;
      data.img_profile = user.profile_pic_url;
      data.img_profile_hd = user.profile_pic_url_hd;
      data.username = user.username;
      data.is_private = user.is_private;
      data.is_verified = user.is_verified;
      data.is_business_account = user.is_business_account;
      data.is_professional_account = user.is_professional_account;
      data.category = user.category_name;

      console.log("SUCCESS:: ", data.username);
      res.send(data).status(200).end();
    })
    .catch((err) => {
      console.log(`ERROR:: ${username} ::`, err);
      res.send(null).status(err.statusCode).end();
    });
});

server.get("/webdriver", async (req, res) => {});

server.listen(PORT, () => {
  console.log(`Scraper working at http://localhost:${PORT}`);
});
