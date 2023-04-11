import { client } from '../index.js';

export async function hashpass(email,firstname,lastname,username, hashpassword) {
  return await client
    .db("day43")
    .collection("day43")
    .insertOne({
      firstname:firstname,
      lastname:lastname,
      username: username,
      password: hashpassword ,
      email:email
    });
}

export async function getuserbyname(username, hashpassword) {
    return await client
      .db("day43")
      .collection("day43")
      .findOne({
        username: username
      });
  }

