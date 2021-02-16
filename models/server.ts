import express, { Application } from "express";
import userRoutes from "../routes/user"
import cors from "cors"
import db from '../db/connection';

class Server {

  private app: Application;
  private port: string
  private apiPaths = {
    users: "/api/users"
  }

  constructor() {
    this.app = express()
    this.port = process.env.PORT || "8000"

    // Connect database
    this.dbConnection()

    // Set middlewares
    this.middlewares()

    // Set routes
    this.routes();
  }

  async dbConnection() {
    try {
      await db.authenticate()
      console.log("Database connected!");
    } catch (error) {
      throw new Error(error)
    }
  }

  middlewares() {
    // CORS
    this.app.use(cors())

    // Parse JSON
    this.app.use(express.json())

    // Public folder
    this.app.use(express.static("public"))
  }

  routes() {
    this.app.use(this.apiPaths.users, userRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listen port ${this.port}`);
    })
  }
}

export default Server;