import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const TableSkeleton = ({ columns = 5 }) => {
  const skeletonItems = Array(10).fill({});

  return (
    <SkeletonTheme color="#e0e0e0" highlightColor="#f5f5f5">
      <table className="table ItemsCheckboxSec dataTable no-footer mb-0">
        <thead>
          <tr>
            {Array.from({ length: columns }, (_, index) => (
              <th key={index}>
                <Skeleton />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {skeletonItems.map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: columns }, (_, colIndex) => (
                <td key={colIndex}>
                  <Skeleton />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </SkeletonTheme>
  );
};
export default TableSkeleton;
