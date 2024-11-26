import React from "react";
import { Table } from "react-bootstrap";

const TemperatureData = {
  data: [
    ["Paul Byrd", "Chief Financial", "New York", "33"],
    ["Gloria ", "Systems ", "New York", "47"],
    ["Bradley ", "Software ", "London", "51"],
    ["Dai Rios", "Personnel ", "Edinburgh", "66"],
    ["Jenette", "Development ", "New York", "29"],
    ["Yuri Berry", "Chief ", "New York", "45"],
    ["Caesar Vance", "Pre-Sales", "New York", "62"],
    ["Doris Wilder", "Sales ", "Sydney", "55"],
    ["Angelica Ramos", "Chief ", "London", "53"],
    ["Gavin Joyce", "Developer", "Edinburgh", "72"],
  ],
  columns: ["Object", "No Of Events", "Min Temperature", "Max Temperature"],
};

const TemperatureTable = () => {
  return (
    <div className="col-12">
      <div className="card">
        <div className="card-body" style={{ padding: "0.25rem" }}>
          <Table responsive className="w-100">
            <div id="example_wrapper" className="dataTables_wrapper">
              <table
                id="example"
                className="display w-100 dataTable"
                role="grid"
                aria-describedby="example_info"
              >
                {TemperatureData.columns.map((d, i) => (
                  <th
                    style={{
                      padding: "0.25rem 0.9375rem",
                      backgroundColor: "#F5F5F5",
                    }}
                    key={i}
                  >
                    {d}
                  </th>
                ))}
                <tbody>
                  {TemperatureData.data.map((d, i) => (
                    <tr key={i}>
                      {d.map((da, i) => (
                        <td key={i}>{da}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default TemperatureTable;
