import express from "express";
import ApiController from "@server/controllers/api";

export function setRoutes(app: express.Application): void {
  const apiController = new ApiController();

  // Define API routes
  app.get("/api/jobs", apiController.getJobs);

  // Serve static files
  app.use(express.static("./public/dist"));

  // Render the React application
  app.get("/", apiController.renderApp);
}
