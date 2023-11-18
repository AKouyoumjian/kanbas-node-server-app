// const express = require("express");
import express from "express";
import HelloRoutes from "./hello.js";
import Lab5 from "./lab5.js";
import cors from "cors";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import AssignmentRoutes from "./assignments/routes.js";
import dotenv from "dotenv";
import session from "express-session";

const app = express();

app.use(express.json());



app.use(cors());
ModuleRoutes(app);
CourseRoutes(app);
AssignmentRoutes(app);
Lab5(app);
HelloRoutes(app);

dotenv.config();

// listen on the port or default to 4000.
app.listen(process.env.PORT || 4000);