import React from "react";
import { Link } from "react-router-dom";

function ItemCategories(props) {
  return (
    <div className="col-xs-6 col-sm-6 col-md-3 col-lg-3 p-2">
      <div className="card card__categories">
        <Link to={props.url}>
          <div className="card-body">
            {props.children}
            <h2 className="card-title card__title">{props.title}</h2>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default ItemCategories;
