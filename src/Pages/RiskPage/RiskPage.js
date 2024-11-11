import {useState, useEffect, useContext} from "react";
import ServerContext from "../../context/server-context";
import Section from "../../components/Layout/Section";

const RiskPage = (props) => {
    const server = useContext(ServerContext)['server'];

    return (
        <div className={'page-container'}>
            <Section title="VAR">

            </Section>
            <Section title="Monte Carlo">

            </Section>
        </div>
    );
};

export default RiskPage;