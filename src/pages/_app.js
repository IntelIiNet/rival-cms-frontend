import "@/styles/globals.css";
import React, { useState } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../theme";
import createEmotionCache from "../createEmotionCache";
import "react-quill/dist/quill.snow.css";
import "react-toastify/dist/ReactToastify.css";
import ToasterContext from "../utils/context/tosterContext";
import { ToastContainer, toast } from "react-toastify";
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [showToaster, setShowToaster] = useState();
  const toastOption = {
    autoClose: 3000,
    position: "top-right",
    closeOnClick: true,
    hideProgressBar: false,
    pauseOnHover: true,
    progress: undefined,
    draggable: true,
    theme: "colored",
  };

  const fireToasterHandler = (value, message) => {
    if (value) {
      toast.success(message, toastOption);
    } else {
      toast.error(message, toastOption);
    }

    setShowToaster(value);
  };
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <ToastContainer />
        <ToasterContext.Provider
          value={{
            isSuccess: showToaster,
            fireToasterHandler: fireToasterHandler,
          }}
        >
          <Component {...pageProps} />
        </ToasterContext.Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
