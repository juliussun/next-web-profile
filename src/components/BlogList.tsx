import fs from "fs"
import Link from "next/link";
import { Fragment } from "react";

const getPostMdFiles = () => {
    const folder = "./src/app/blogs/";
    const files = fs.readdirSync(folder);
    const mdFiles = files.filter((file)=>file.endsWith(".md"));
    const slugs = mdFiles.map((file)=>file.replace(".md",""));
    return slugs;
}

export default function BlogList(){
    const postMetaData = getPostMdFiles();
    
    return (
        <Fragment>
            {postMetaData.map((slug)=>(
                <div key={slug}>
                    <Link href={`/articles/${slug}`}>
                        <h2>{slug}</h2>
                    </Link>
                </div>
            ))}
        </Fragment>
    )
}