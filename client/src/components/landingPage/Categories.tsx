import  React from "react";
import { useState } from "react";

import Category from "./Category"



interface CategoriesProps {
  categories:string[],
  selectedCat?:string
}

const Categories: React.FC<CategoriesProps> = ({
  categories
}) => {
  const [selectedCat,setSelectedCat]=useState("none")
    return ( 
      <div>
        <h1>Events nach Kategorien entdecken</h1> 
        <div className="bg-white flex w-full p-4">
          <div className="grid grid-cols-5 place-items-center w-full">
              {categories.map((category, index) => (
                <div key={index} className="mb-8 mx-2 bg-slate-300 text-white shadow rounded p-8" onClick={() => {setSelectedCat(categories[index])}}>
                  <p>{category}</p>
                </div>
              ))}
          </div>
        </div>
        <Category name={selectedCat} description="2"/>
      </div>
    );
  }
  
export default Categories;
