import React, { useState } from 'react';
import { Tabs, Tab, Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function ClosableTabs() {
  const [tabs, setTabs] = useState([
    { label: 'Tab 1', subTabs: ['Subtab 1.1', 'Subtab 1.2'] },
    { label: 'Tab 2', subTabs: ['Subtab 2.1'] },
    { label: 'Tab 3', subTabs: ['Subtab 3.1', 'Subtab 3.2'] },
  ]);
  const [mainTabIndex, setMainTabIndex] = useState(0);
  const [subTabIndex, setSubTabIndex] = useState(0);

  const handleMainTabChange = (event, newValue) => {
    setMainTabIndex(newValue);
    setSubTabIndex(0);
  };

  const handleSubTabChange = (event, newValue) => {
    setSubTabIndex(newValue);
  };

  const closeMainTab = (index) => {
    const newTabs = tabs.filter((_, i) => i !== index);
    setTabs(newTabs);
    if (mainTabIndex === index) {
      setMainTabIndex(0);
    } else if (mainTabIndex > index) {
      setMainTabIndex(mainTabIndex - 1);
    }
  };

  const closeSubTab = (mainIndex, subIndex) => {
    const newTabs = tabs.map((tab, i) => {
      if (i === mainIndex) {
        return {
          ...tab,
          subTabs: tab.subTabs.filter((_, j) => j !== subIndex),
        };
      }
      return tab;
    });
    setTabs(newTabs);
    if (subTabIndex === subIndex) {
      setSubTabIndex(0);
    } else if (subTabIndex > subIndex) {
      setSubTabIndex(subTabIndex - 1);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={mainTabIndex} onChange={handleMainTabChange} aria-label="Main Tabs">
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {tab.label}
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeMainTab(index);
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            }
          />
        ))}
      </Tabs>
      {tabs.map((tab, index) => (
        <TabPanel key={index} value={mainTabIndex} index={index}>
          <Tabs value={subTabIndex} onChange={handleSubTabChange} aria-label="Sub Tabs">
            {tab.subTabs.map((subTab, subIndex) => (
              <Tab
                key={subIndex}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {subTab}
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        closeSubTab(index, subIndex);
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                }
              />
            ))}
          </Tabs>
          {tab.subTabs.map((subTab, subIndex) => (
            <TabPanel key={subIndex} value={subTabIndex} index={subIndex}>
              <Typography>{`${subTab} Content`}</Typography>
            </TabPanel>
          ))}
        </TabPanel>
      ))}
    </Box>
  );
}
