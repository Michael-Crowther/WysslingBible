import { google, docs_v1 } from 'googleapis';
import key from './qaqc-bible-8a46cec1ee43.json';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Buffer } from 'buffer';

const jwtClient = new google.auth.JWT(
  key.client_email,
  undefined,
  key.private_key,
  ['https://www.googleapis.com/auth/documents.readonly'] // scopes needed for the Google Docs API
);


const General: React.FC = () => {
    const [todo, setTodo] = useState<string>("");

    const [docContent, setDocContent] = useState<string>("Loading...");

    jwtClient.authorize((err, tokens) => {
        if (err) {
        console.log(err);
        return;
        }

        const docs = google.docs({
        version: 'v1',
        auth: jwtClient
        });

        docs.documents.get({
        documentId: '1zTzNCJiTFrSSRjXTj1WTrFeXFuG2cRLPsNKLZhaBwy0'
        }, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }

        const docContent = res?.data?.body?.content;
        if(docContent){
            const contentString = JSON.stringify(docContent);
            setDocContent(contentString);
        }
        else
            setDocContent("No content found");
        });
    });

    return(
        <div className="mainContent">
            <Link to="/" style = {{textDecoration: 'none', color: 'white'}}>
                <div className = "buttonContainer">
                    <button className="homeButton">Home</button>
                </div>
            </Link>
            <h1 className="pageHeader">SLA / General</h1>
            <div>{docContent}</div>
        </div>
    );
}

export default General;