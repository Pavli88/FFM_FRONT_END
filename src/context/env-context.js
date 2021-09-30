import React from "react";

const EnvContext = React.createContext({
    environment: 'live'
});

export default EnvContext;