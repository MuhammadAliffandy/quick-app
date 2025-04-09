'use client'

import { useState } from 'react';
import { Box, MenuItem, Select, Chip, OutlinedInput , InputAdornment } from '@mui/material';
import Image from 'next/image';

const options = [
  { label: 'Important ASAP', color: 'stikers.main' },
  { label: 'Offline Meeting', color: 'stikers.orangeLight' },
  { label: 'Virtual Meeting', color: 'stikers.yellowLight' },
  { label: 'ASAP', color: 'stikers.toscaLight' },
  { label: 'Client Related', color: 'stikers.greenLight' },
  { label: 'Self Task', color: 'stikers.purpleLight' },
  { label: 'Appointments', color: 'stikers.pinkLight' },
  { label: 'Court Related', color: '#c6dbee' },
];

const AppSelectCategory = (props) => {
  const [selected, setSelected] = useState([]);
  const [change, setChange] = useState(false);

  const handleChange = (event) => {
    setChange(true)
    setSelected(event.target.value);
    props.onChange(event.target.value)
  };

  return (
        <Select
          multiple
          autoWidth={false}
          value={ props.value || selected}
          onChange={handleChange}
          onBlur={()=> {setChange(false)}}
          IconComponent={() => null}
          sx={{ 
            width: "90%",
          }}
          input={<OutlinedInput />}
          MenuProps={{
            sx:{
              padding: 0,
              
            },
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "left", 
              },
              PaperProps: {  
                elevation:0,
                style: {
                  minWidth: '20%',
                  border: "1px solid #828282"
                }
              }
            }}
          startAdornment={
            <InputAdornment position="start" sx={{ paddingRight: "0px" }}>
              {
                change ?
                <Image src={"/icon/bookmark.svg"} alt="search-icon" width={20} height={20} />
                :
                <Image src={"/icon/bookmark-gray.svg"} alt="search-icon" width={20} height={20} />
              }
            </InputAdornment>
          }
          renderValue={(selectedItems) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 , width:'100%'  }}>
              {selectedItems.map((value) => {
                const item = options.find(o => o.label === value);
                return (
                  <Chip
                    key={value}
                    label={value}
                    sx={{
                      backgroundColor: item?.color,
                      fontWeight: 'bold',
                      borderRadius: '6px',
                    }}
                  />
                );
              })}
            </Box>
          )}
        >
          {options.map((option) => (
            <MenuItem key={option.label} value={option.label}>
              <Box
                sx={{
                  backgroundColor: option.color,
                  padding: '4px 8px',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  width:'100%' 
                }}
              >
                {option.label}
              </Box>
            </MenuItem>
          ))}
        </Select>
  );
}

export default AppSelectCategory;