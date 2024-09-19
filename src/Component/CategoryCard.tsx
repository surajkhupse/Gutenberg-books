import React from "react";

export interface CategoryCardProps {
  id: any;
  name: string;
  icon: string;
  link: string;
  linkIcon: string;
  onClick: any;
}

const CategoryCard = (props: CategoryCardProps) => {
  return (
    <div key={props.id} className="">
      <div className=" py-2">
        <div className="bg-white handCursor" onClick={(e) => {
                  e.preventDefault();
                  props.onClick(props.name);
                }}
                >
          <div className="bg-opacity-25 shadow p-2 d-flex justify-content-between bg-white">
            <div>
              <img src={props.icon} alt={`${name} Icon`} />

              <span className="ps-3">{props.name}</span>
            </div>
            <div>
              <a
                href={props.link}
                onClick={(e) => {
                  e.preventDefault();
                  props.onClick(props.name);
                }}
              >
                <img src={props.linkIcon} alt="Next Icon" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
