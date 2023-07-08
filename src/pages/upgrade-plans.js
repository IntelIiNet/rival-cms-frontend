import React from "react";
import { Layout } from "../layouts/dashboard/layout";
import Head from "next/head";
const dashboard = () => {
  return (
    <Layout>
      <Head>
        <title>Upgrade plans</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Upgrade plans</h1>
      </main>
    </Layout>
  );
};
export default dashboard;
