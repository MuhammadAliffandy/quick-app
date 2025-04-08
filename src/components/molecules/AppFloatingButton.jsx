'use client'
import { useState } from "react";
import { motion } from "framer-motion";
import AppCircleButton from "../atoms/AppCircleButton";

const AppFloatingButton = (props) => {

  const quickData = [
    {
      icon: '/icon/tab.svg',
      iconInit: '/icon/tab-white.svg',
      name: 'todo',
      backgroundColor: 'indicator.main',
      isChild: true
    },
    {
      icon: '/icon/chat-purple.svg',
      iconInit: '/icon/chat-white.svg',
      name: 'inbox',
      backgroundColor: 'indicator.purple',
      isChild: true
    },
    
  ]

  const quickEarly = [
    {
      iconInit: '/icon/thunder.svg',
      name: 'thunder',
      backgroundColor: 'primary.main',
      isChild: false
    },
    
  ]

  const [quicks, setQuicks] = useState(quickData)
  const [quicksInitiate, setQuicksInitiate] = useState(quickEarly)

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="fixed bottom-6 right-6 z-59 flex items-center flex-row-reverse justify-end gap-[5px]">

      {
        quicksInitiate.map((data, index )=>{
          return(      
            <AppCircleButton
              key= {index}
              iconPath={data.iconInit}
              iconSize={ data.name != 'thunder' ? 30 : 60}
              backgroundColor={data.backgroundColor}
              alt={data.name}
              iconPadding={ data.name != 'thunder' ? '20px' : '5px'}
              isChild={data.isChild}
              onClick={()=>{
                toggleExpand()
                props.onClick(data.name)
              }}
              onClickRange={()=>{
                setQuicksInitiate(quickEarly)
                setQuicks(quickData)
                setIsExpanded(false)
                props.onClickRange()
              }}
            />
      )
        })
      }

      <motion.div
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? -20 : 20 }}
          transition={{ duration: 0.3 }}
          className="relative flex items-center justify-end gap-2 "
          style={{ pointerEvents: isExpanded ? "auto" : "none" }}
        >
          {
            quicks.map((quick, index)=>{
              return(
                  <AppCircleButton
                    key={index}
                    iconPath={quick.icon}
                    iconSize={28}
                    backgroundColor={'white'}
                    alt={quick.name}
                    iconPadding={'15px'}
                    onClick= {()=>{
                      setQuicks(quickData.filter(data => {return data.name != quick.name}))
                      setQuicksInitiate(quickData.filter(data => {return data.name == quick.name}))
                      props.onClickQuick(quick.name)
                    }}  
                  />
                )
              })
            }

        </motion.div>
    </div>
  );
};

export default AppFloatingButton;
