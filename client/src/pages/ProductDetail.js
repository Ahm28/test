import React from "react";
import { useParams } from "react-router-dom";
import AppBarComp from "../components/AppBar/AppBarComp";

export default function ProductDetail() {
  const { id } = useParams();
  return (
    <>
      <AppBarComp />
      <div>ProductDetail {id} </div>
    </>
  );
}
