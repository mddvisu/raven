const ClassInspector = ({data}) => {
    return (
    <div style={{textAlign: "left"}}>
        <h1>{data.name}</h1>
        <h2>Access: {data.access}</h2>
        <h2>Extends: {data.extends}</h2>
        <h2>Static: {data.static.toString()}</h2>
        <h2>Abstract: {data.abstract.toString()}</h2>
        <h2>Interface: {data.interface.toString()}</h2>
        <h2>Attributes: </h2>
        <div style={{fontSize: "75%"}} >
            {data.attributes.map((attribute) => (
                <h3>
                    - {attribute.name}
                </h3>
            ))}
        </div>
        <h2>Methods: </h2>
        <div style={{fontSize: "75%"}} >
            {data.methods.map((method) => (
                <h3>
                    - {method.name}
                </h3>
            ))}
        </div>
    </div> 
    );
};

export default ClassInspector;