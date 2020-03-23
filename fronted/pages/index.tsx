import * as React from "react";
import { NextPage } from "next";
import Map from '../components/mapa';
import "../styles/app.styl";

const IndexPage: NextPage = () => (
  <div>
    <h1>Hello Proyect X</h1>
    <p>With TypeScript</p>
    <Map />
  </div>
);

export default IndexPage;
