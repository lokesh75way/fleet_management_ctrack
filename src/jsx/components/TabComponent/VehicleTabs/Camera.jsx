import React from 'react'
import { Button } from 'react-bootstrap'

const Camera = ({handleNext}) => {
  return (
    <div className="p-4">
      <div className="row" style={{ width: "70%", margin: "auto" }}>
        
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          margin: "2rem 0",
        }}
      >
        <Button onClick={handleNext} style={{ width: "10%" }}> Next</Button>
      </div>
      </div>
    </div>
  )
}

export default Camera