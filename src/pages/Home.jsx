import  { useState } from 'react';
//import SwipeableViews from 'react-swipeable-views';
//import { useTheme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
//import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {SelectFolderPath} from "../logic/folderUtils";
import RavenLogo from "../assets/raven-logo.png"

const Home = () => {
  //const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const handleChangeIndex = (index) => {
  //   setValue(index);
  // };

  return (
    <div className="text-white mt-4 text-center">
      <div className="bg-[#68666c] flex border-4 rounded-3xl">
        <div className="w-2/8 p-2 bg-[#282729] rounded-3xl p-2 m-2 items-center justify-center">
          <div className='w-[300px] justify-center items-center'>
          <header className="flex flex-row mb-4">
                <img src={RavenLogo} className='w-[50px] mr-5'/>
                <button className='rounded-3xl' onClick={SelectFolderPath}>Open Project Directory</button>
          </header>
          </div>
        </div>
        <div className="w-6/8 bg-[#1b1b24] flex p-2 m-2 rounded-3xl border w-[680px] h-[580px]">
          <div className=''>
            <Box className="rounded-2xl ml-1 bg-[#2f315f] "sx={{ maxWidth: { xs: 320, sm: 650 }}}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                  sx={{ '& .MuiSvgIcon-root': { color: 'white' } }} // Change icon color to black
                >
                  <Tab label="Item One" />
                  <Tab label="Item Two" />
                  <Tab label="Item Three" />
                  <Tab label="Item Four" />
                  <Tab label="Item Five" />
                  <Tab label="Item Six" />
                  <Tab label="Item Seven" />
                </Tabs>
              </Box>
          </div>
          {/* <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <div>
              <Typography component="div" role="tabpanel" hidden={value !== 0}>
                Content for Item One
              </Typography>
            </div>
            <div>
              <Typography component="div" role="tabpanel" hidden={value !== 1}>
                Content for Item Two
              </Typography>
            </div>
            <div>
              <Typography component="div" role="tabpanel" hidden={value !== 2}>
                Content for Item Three
              </Typography>
            </div>
          </SwipeableViews> */}
        </div>
      </div>
    </div>
  );
}

export default Home;
