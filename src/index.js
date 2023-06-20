import express from 'express';
import "./config/Database.js"
import userRoute from './controller/user-route.js'
import postRoute from './controller/post-route.js'
import onlineBestellungRoute from './controller/onlineBestellung-route.js'
import rezervationRoute from './controller/rezervation-route.js'
import kontaktRoute from './controller/kontakt-route.js'
import dashboardRoute from './controller/dashboard-route.js'
import speisekartenRoute from './controller/speisekarten-route.js'
import galleryRoute from './controller/gallery-route.js'
import cors from 'cors'
import morgan from "morgan"
import errorHandler from './middleware/errorHandler.js';
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
// API
app.use("/api/v1/users", userRoute);
app.use("/api/v1/onlineBestellung", onlineBestellungRoute);
app.use("/api/v1/rezervation", rezervationRoute);
app.use("/api/v1/kontakt", kontaktRoute);
app.use("/api/v1/posts", postRoute);
app.use("/api/v1/dashboard", dashboardRoute);
app.use("/api/v1/speisekarten", speisekartenRoute);
app.use("/api/v1/gallery", galleryRoute);
app.use(errorHandler);

export default app;