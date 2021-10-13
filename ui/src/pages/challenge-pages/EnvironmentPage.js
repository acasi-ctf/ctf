import Terminal from "../../components/Terminal";

export default function EnvironmentPage({match}) {
    const envId = match.params['env_id'];

    return <>
        <Terminal id={envId}/>
    </>;
}
