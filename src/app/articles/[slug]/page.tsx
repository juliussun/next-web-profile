import { Fragment } from "react";

export default function Page({params}: {params:{slug:string}}){
    return (
        <Fragment>
            <h1>This is a post: {params.slug}</h1>
        </Fragment>
    )
}