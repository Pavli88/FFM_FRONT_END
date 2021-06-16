import React from "react";

const ServerContext = React.createContext({
    server: 'http://127.0.0.1:8000/'
});

export default ServerContext;