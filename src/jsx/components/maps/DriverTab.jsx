import React from 'react'
import { Nav, Tab } from 'react-bootstrap'
import '../../../scss/pages/_driver-tracking.scss'

const DriverTab = ({tabData}) => {
  return (
    <div className="default-tab outer-container">
    <Tab.Container defaultActiveKey={tabData[0].name.toLowerCase()}>
      <Nav as="ul" className="nav-tabs">
        {tabData.map((data, i) => (
          <Nav.Item as="li" key={i}>
            <Nav.Link eventKey={data.name.toLowerCase()}>
              <i className={`la la-${data.icon} me-2`} />
              {data.name}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      <Tab.Content className="pt-4">
        {tabData.map((data, i) => (
          <Tab.Pane eventKey={data.name.toLowerCase()} key={i}>
            <h4>This is {data.name} title</h4>
            <p>{data.content}</p>
            <p>{data.content}</p>
          </Tab.Pane>
        ))}
      </Tab.Content>
    </Tab.Container>
  </div>
  )
}

export default DriverTab