import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import connectToDb from "./db/db.js";
import userRouter from "./routes/user.routes.js";
dotenv.config();


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
connectToDb();

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key", // Store in .env
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true in production with HTTPS
      httpOnly: true, // Prevents client-side access to cookie
      maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
    },
  })
);

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true, // Required for cookies to work with CORS
  })
);

app.get("/", (req, res) => {
  res.send("hello world");
});
app.use("/api/users", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

export default app;
