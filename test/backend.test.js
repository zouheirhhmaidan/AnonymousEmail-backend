const axios = require("axios");
const { isTypedArray } = require("util/types");
const { assert } = require("chai");
const server = require('../server')
const ClientModel = require("../models/Client");
const { doesNotMatch } = require("assert");
const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");
const joi = require('joi');
const { afterEach } = require("mocha");

describe("Login testing", async() => {
  it("Should Login", async () => {
    const body = {
      email: "zouheir.hm@hotmail.com",
      password: "123123",
    };
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/client/loginz`,
      body
    );

    assert.isNotEmpty(res.data);
  });

  it("Should return error null credentials", async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/client/loginz`, {
        email: "",
        password: "",
      });
    } catch (err) {
      assert.equal(err.response.status, 400);
    }
  });

  it("Should return email is required", async () => {
    const body = {
      email: "",
      password: "123123",
    };
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/client/loginz`, body);
    } catch (err) {
      assert.equal(err.code, "ERR_BAD_REQUEST");
    }
  });

  it("Should return password is required", async () => {
    const body = {
      email: "zouheir.hm@hotmail.com",
      password: "",
    };
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/client/loginz`, body);
    } catch (err) {
      assert.equal(err.code, "ERR_BAD_REQUEST");
    }
  });

  it("Should return wrong credentials", async () => {
    const body = {
      email: "zouheir.hm@hotmail.com",
      password: "1234567",
    };
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/client/loginz`, body);
    } catch (err) {
      assert.equal(err.code, "ERR_BAD_REQUEST");
    }
  });
});

describe('Email testing', () => {
  it("Email is required", async () => {
    body = {
      email: "",
        subject: "Test",
        text: "Test",
    }
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/client/email`, body);
    } catch (error) {
      console.log(error);
      assert.equal(error, 'No recipients defined');
    }
  });

  it("Subject is required", async () => {
    body = {
      email: "zouheir.hm@hotmail.com",
        subject: "",
        text: "Test",
    }
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/client/email`, body);
    } catch (error) {
      console.log(error);
      assert.equal(error, 'No recipients defined');
    }
  });

  it("text is required", async () => {
    body = {
      email: "zouheir.hm@hotmail.com",
        subject: "Test",
        text: "",
    }
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/client/email`, body);
    } catch (error) {
      console.log(error);
      assert.equal(error, 'No recipients defined');
    }
  });

  it('Should send email', async () => {
    body = {
    email: "zouheir.hm@hotmail.com",
        subject: "Test",
        text: "Test",
    }
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/client/email`, body)
    assert.equal(res.status, 200)
  })
 
  return
  
})

