const express=require('express')
const app=express()
const bcrypt = require("bcrypt");
const db_connect=require('./db/dbConnect')
const User = require("./db/userModel");


db_connect()