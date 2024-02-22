import React, { useState } from 'react';
import TabCard from './TabCard';

function Tabs(props) {
  const { tabs = [] } = props;
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleTabClick = (clickedTab) => {
    setActiveTab(clickedTab);
  };

  return (
    <div className="container-fluid">
      <div className="tabs row w-100">
        {tabs.map((tab, index) => (
          <TabCard
            key={index}
            data={tab}
            isActive={activeTab === tab}
            onClick={() => handleTabClick(tab)}
          />
        ))}
      </div>
      {activeTab && <div>{activeTab.component}</div>}
    </div>
  );
}

export default Tabs;