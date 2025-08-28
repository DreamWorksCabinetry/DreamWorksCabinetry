export function Card(props){ return <div className={"card " + (props.className||"")}>{props.children}</div>; }
export function CardContent(props){ return <div className={"card-content " + (props.className||"")}>{props.children}</div>; }
