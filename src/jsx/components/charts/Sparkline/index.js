import React from "react";

import { Row, Col, Card } from "react-bootstrap";
import {
  Sparklines,
  SparklinesLine,
  SparklinesBars,
  SparklinesSpots,
  SparklinesReferenceLine,
} from "react-sparklines";

import PageTitle from "../../../layouts/PageTitle";

const sampleData = [
  64, 24, 40, 76, 19, 0, 2, 46, 65, 12, 10, 6, 15, 57, 35, 81, 86, 12, 12, 21,
  53, 44, 2, 1, 58, 9, 61, 64, 42, 92, 58, 9, 34, 47, 89, 52, 3, 69, 33, 2, 60,
  71, 71, 22, 65, 70, 31, 81, 36, 89,
];

function ChartSparkline() {
  return (
    <>
      <PageTitle motherMenu="Charts" activeMenu="Sparkline" />
      <div className="container-fluid">
        <Row>
          <Col xl={6} lg={6}>
            <Card>
              <Card.Header>
                <h4 className="card-title">Simple</h4>
              </Card.Header>
              <Card.Body>
                <Sparklines data={sampleData}>
                  <SparklinesLine color="var(--primary)" />
                </Sparklines>
              </Card.Body>
            </Card>
          </Col>

          <Col xl={6} lg={6}>
            <Card>
              <Card.Header>
                <h4 className="card-title">Simple Curve</h4>
              </Card.Header>
              <Card.Body>
                <Sparklines data={sampleData}>
                  <SparklinesLine color="var(--primary)" />
                  <SparklinesReferenceLine
                    type="mean"
                    color="var(--primary) "
                  />
                </Sparklines>
              </Card.Body>
            </Card>
          </Col>

          <Col xl={6} lg={6}>
            <Card>
              <Card.Header>
                <h4 className="card-title">Spots</h4>
              </Card.Header>
              <Card.Body>
                <Sparklines data={sampleData}>
                  <SparklinesLine
                    color="var(--primary)"
                    style={{ fill: "none" }}
                  />
                  <SparklinesSpots />
                </Sparklines>
              </Card.Body>
            </Card>
          </Col>

          <Col xl={6} lg={6}>
            <Card>
              <Card.Header>
                <h4 className="card-title">Spots</h4>
              </Card.Header>
              <Card.Body>
                <Sparklines data={sampleData}>
                  <SparklinesLine color="var(--primary) " />
                  <SparklinesSpots style={{ fill: "var(--primary) " }} />
                </Sparklines>
              </Card.Body>
            </Card>
          </Col>
          <Col xl={6} lg={6}>
            <Card>
              <Card.Header>
                <h4 className="card-title">Spots1</h4>
              </Card.Header>
              <Card.Body>
                <Sparklines data={sampleData}>
                  <SparklinesBars
                    style={{ fill: "var(--primary)", fillOpacity: ".6" }}
                  />
                  <SparklinesReferenceLine />
                </Sparklines>
              </Card.Body>
            </Card>
          </Col>

          <Col xl={6} lg={6}>
            <Card>
              <Card.Header>
                <h4 className="card-title">Spots</h4>
              </Card.Header>
              <Card.Body>
                <Sparklines data={sampleData} margin={6}>
                  <SparklinesLine
                    style={{
                      strokeWidth: 3,
                      stroke: "var(--primary)",
                      fill: "none",
                    }}
                  />
                  <SparklinesSpots
                    size={4}
                    style={{
                      stroke: "var(--primary)",
                      strokeWidth: 3,
                      fill: "white",
                    }}
                  />
                </Sparklines>
              </Card.Body>
            </Card>
          </Col>

          <Col xl={6} lg={6}>
            <Card>
              <Card.Header>
                <h4 className="card-title">Bars</h4>
              </Card.Header>
              <Card.Body>
                <Sparklines
                  data={[
                    20, 30, 30, 42, 43, 20, 21, 32, 30, 43, 23, 30, 65, 43, 30,
                    24, 54,
                  ]}
                >
                  <SparklinesBars style={{ fill: "var(--primary)" }} />
                </Sparklines>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ChartSparkline;
