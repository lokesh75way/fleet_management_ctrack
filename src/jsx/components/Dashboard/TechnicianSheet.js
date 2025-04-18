import React, { useMemo, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MdClose } from "react-icons/md";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import TableSkeleton from "@/components/Skeleton/Table";
import { getAllTechnicians } from "../../../features/technician/api";
import ReactPaginate from "react-paginate";

const TechnicianSheet = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 8;

  const { data, isLoading } = useQuery({
    queryKey: ["all-technicians-sheet", page],
    queryFn: () => getAllTechnicians(page, itemsPerPage),
    staleTime: Infinity,
    enabled: isOpen,
  });


  useEffect(() => {
    if (data) setTotalCount(data.totalCount);
  }, [data]);


  const sortedTechnicians = useMemo(() => {
    if (!data?.data) return [];
    return [...data.data].sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }, [data]);
  

  const renderStarRating = (rating) => {
    const ratingValue = rating || 0;
    const stars = [];

    // Add filled stars based on rating
    for (let i = 0; i < ratingValue; i++) {
      stars.push(<FaStar key={`star-${i}`} color="gold" className="me-1" />);
    }

    // Add empty stars to complete 5 stars
    for (let i = ratingValue; i < 5; i++) {
      stars.push(
        <FaRegStar key={`empty-star-${i}`} color="gold" className="me-1" />
      );
    }

    return stars;
  };
  const isRtl = document?.documentElement?.dir === "rtl";

  const formatCount = (num) => {
    if (num >= 1_000_000)
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
    return num;
  };

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  if (!isOpen) return null;

  return (
    <div
      className="position-fixed top-0 end-0 bottom-0 bg-white shadow"
      style={{
        width: "500px",
        zIndex: 1050,
        transition: "all 0.3s ease",
        overflowY: "auto",
      }}
    >
      <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
        <h4 className="m-0">{t("technicians")}</h4>
        <button className="btn btn-icon btn-sm" onClick={onClose}>
          <MdClose size={24} />
        </button>
      </div>

      <div className="p-3">
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <>
            <table className="table">
              <thead>
                <tr>
                  <th>{t("technicianName")}</th>
                  <th>{t("rating")}</th>
                  <th>{t("tasks")}</th>
                </tr>
              </thead>
              <tbody>
                {sortedTechnicians.map((tech, index) => (
                  <tr key={tech._id || index}>
                    <td>
                      {tech.firstName} {tech.lastName}
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="me-2 text-muted px-2 py-1 border rounded">
                          {(tech.rating ?? 3.0).toFixed(1)}
                        </span>
                        {renderStarRating(tech.rating ?? 3.0)}
                        <span className="me-2 text-muted ">
                          ({formatCount(tech.ratedBy ?? 1200)})
                        </span>
                      </div>
                    </td>
                    <td>{tech.totalTasks ?? 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="d-sm-flex text-center justify-content-between align-items-center mt-3">
              <div className="dataTables_info">
                {t("showing")} {(page - 1) * itemsPerPage + 1} {t("to")}{" "}
                {Math.min(page * itemsPerPage, totalCount)} {t("of")}{" "}
                {totalCount} {t("entries")}
              </div>
              <div
                className="dataTables_paginate paging_simple_numbers"
                id="technician-sheet-paginate"
              >
                <ReactPaginate
                  previousLabel={
                    isRtl ? (
                      <i className="fa-solid fa-angle-right"></i>
                    ) : (
                      <i className="fa-solid fa-angle-left"></i>
                    )
                  }
                  nextLabel={
                    isRtl ? (
                      <i className="fa-solid fa-angle-left"></i>
                    ) : (
                      <i className="fa-solid fa-angle-right"></i>
                    )
                  }
                  breakLabel={"..."}
                  pageCount={Math.ceil(totalCount / itemsPerPage)}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination"}
                  activeClassName={"active"}
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  forcePage={page - 1}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TechnicianSheet;
