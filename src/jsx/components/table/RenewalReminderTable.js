import React from "react";
import { Table } from "react-bootstrap";

const RenewalReminderData = {
  data: [
    ["Paul Byrd", "$725,000"],
    ["Gloria ", "$237,500"],
    ["Bradley ", "$132,000"],
    ["Dai Rios", "$217,500"],
    ["Jenette", "$345,000"],
    ["Yuri Berry", "$675,000"],
    ["Caesar Vance", "$106,450"],
    ["Doris Wilder", "$85,600"],
    ["Angelica Ramos", "$1,200,000"],
    ["Gavin Joyce", "$92,575"],
  ],
  columns: ["Maintenance Type", "Due"],
};

const RenewalReminderTable = () => {
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
                {RenewalReminderData.columns.map((d, i) => (
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
                  {RenewalReminderData.data.map((d, i) => (
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

export default RenewalReminderTable;
