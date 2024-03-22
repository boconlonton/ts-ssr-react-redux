import { Request, Response } from "express";

import express from "express";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "@client/redux/slices/jobSlice";
import { renderSSRComponents } from "@server/service/rengine/ssr-rendering";

const _DATA = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta name="robots" content="">  <title></title> <!-- head.html -->
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="description" content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#f2f2f2" />
    <link rel="stylesheet"
        href="https://d2ir6gu3mx7cqv.cloudfront.net/company/sites/font-awesome-6/6.5.1/css/all.min.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap" rel="stylesheet" />
    <link rel="stylesheet" crossorigin href="/style-2.css" />
    <link rel="stylesheet" crossorigin href="/vendor.css" />
    <link rel="stylesheet" crossorigin href="/new-job-list.css" />
    <script type="module" crossorigin
        src="https://d2ir6gu3mx7cqv.cloudfront.net/company/sites/160607/assets/js/slick-2y1R_c3m.js"></script>
    <script type="module" crossorigin
        src="https://d2ir6gu3mx7cqv.cloudfront.net/company/sites/160607/assets/js/index-LSl558sm.js"></script>
</head>

<body>
  <div class="c-main-hero-search-wrap" data-react-component="jobs-search"
  data-react-prop-title="c-main-hero-search" data-react-prop-horizontal="true">SSR_JobsSearch</div>
  <script src="/bundle.js"></script>
    
</body>
</html>
`;

class ApiController {
  // Method for fetching job data asynchronously
  async getJobs(req: Request, res: Response) {
    try {
      // Fetch job data from the API
      const jobs = await fetch("/api/jobs");

      // Process the job data

      // Send the processed job data as the response
      res.json(jobs);
    } catch (error) {
      // Handle error
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Method for updating job data asynchronously
  async updateJob(req: Request, res: Response) {
    try {
      const { jobId, data } = req.body;

      // Update job data in the API

      // Send the updated job data as the response
      res.json({ success: true });
    } catch (error) {
      // Handle error
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  public renderApp = async (req: express.Request, res: express.Response) => {
    const store = configureStore({
      reducer: rootReducer.reducer,
      preloadedState: {
        title: "Your App",
        description: "Your App Description",
      },
    });

    const { content, components } = renderSSRComponents(_DATA, store);

    const preloadedState = store.getState();
    console.log(preloadedState);
    const resContent = content.replace(
      "</head>",
      `<script>window.__PRELOAD_STATE__ = ${JSON.stringify(
        preloadedState
      )}</script></head>`
    );

    res.send(resContent);
  };
}

export default ApiController;
