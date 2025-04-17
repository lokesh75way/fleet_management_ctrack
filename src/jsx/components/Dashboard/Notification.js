import React, { useMemo } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import avatar1 from "@/assets/images/avatar/1.jpg";
import { getAllTechnicians } from "../../../features/technician/api";
import { useQuery } from "@tanstack/react-query";

const renderStarRating = (rating = 0) => (
  <>
    {[...Array(5)].map((_, i) =>
      i < Math.floor(rating) ? (
        <FaStar key={i} color="gold" className="me-1" />
      ) : (
        <FaRegStar key={i} color="gold" className="me-1" />
      )
    )}
  </>
);

const Notification = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["all-technicians-sheet"],
    queryFn: () => getAllTechnicians(), 
    staleTime: Infinity,
  });

  const topTechnicians = useMemo(() => {
    if (!data?.data) return [];
  
    return [...data.data]
      .map(tech => ({
        id: tech._id || tech.id,
        name: `${tech.firstName || ''} ${tech.middleName || ''} ${tech.lastName || ''}`.trim(),
        rating: 3 + Math.random() * 2, 
        avatar: null
      }))
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5);
  }, [data]);
  
  if (isLoading) {
    return <div className="card-body">Loading...</div>;
  }

  return (
    <div className="card-body">
      <div className="widget-media dz-scroll ps--active-y">
        <ul className="timeline">
          {topTechnicians.map((tech) => (
            <li key={tech.id}>
              <div className="timeline-panel d-flex align-items-center justify-content-between">
                <div className="media me-2">
                  {tech.avatar ? (
                    <img alt="" width="50" src={tech.avatar} />
                  ) : (
                    <div className="media media-info">{tech.name.charAt(0)}</div>
                  )}
                </div>
                <div className="media-body d-flex align-items-center w-100">
                  <h5 className="mb-0 pe-2">{tech.name}</h5>
                  <div className="ms-auto d-flex align-items-center">
                    <span className="me-2 text-muted">{tech.rating.toFixed(1)}</span>
                    {renderStarRating(tech.rating)}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notification;