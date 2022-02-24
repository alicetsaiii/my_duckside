// ----- 晴暄、鎧洋 ----- //

import { Axios } from 'axios';
import React, { Component, useState } from 'react';
import { Row, Modal } from 'react-bootstrap';
import "../css/GameDaily_style.css"
import { PlusCircle, Search, DashCircle, Gift } from "react-bootstrap-icons"

function GameDailyRun() {
   const [FindShow, setFindShow] = useState(false);
   const [GiftShow, setGiftShow] = useState(false);
   const [NextShow, setNextShow] = useState(false);
   const [ImgPath, setImgPath] = useState();

   return (
      <>
         <div className="header">
            <span className="headerSide">2019/01/02 交易建立</span>
            <a href="http://localhost:3000/game/daily">
               <button className="headerBack" ><span className="header-Back-text">返回關卡</span> </button>
            </a>
            <div>
               <ul>
                  <li className="testinput">
                     <span className="buyTitle">證券代號 / 名稱 :
                        <input type="text" className="testEnter" />
                        <button className="button-plus" onClick={() => setFindShow(true)}>
                           <Search className="button-plus-icon" />
                           <span className="button-plus-text">查詢</span>
                        </button>
                     </span>
                  </li>
                  <li className="testinput">
                     <span className="buyTitle">買進股數 :
                        <input type="text" className="testEnterOne" />
                        <button className="button-plus">
                           <PlusCircle className="button-plus-icon" />
                           <span className="button-plus-text">買進</span>
                        </button>
                        <button className="button-plus">
                           <DashCircle className="button-plus-icon" />
                           <span className="button-plus-text">賣出</span>
                        </button>
                     </span>
                  </li>
               </ul>

               <span className="testInput">
                  <ul>

                     <li>
                        <div className="haveDiv"></div>
                     </li>

                     <span className="haveUl">
                        <button className="nextButton-plus">
                           <span className="nextButton-plus-text">下一關</span>
                        </button>

                        <button className="getButton-plus" onClick={() => { setGiftShow(true) }}>
                           <span className="getButton-plus-text">領取獎勵</span>
                           <Gift className="getButton-gift-icon" />
                        </button>
                     </span>


                  </ul>
               </span>

               <span>
                  <img src="/assets/images/duck.svg" className="duckPict" />
               </span>
            </div>

         </div>

         <Modal
            centered
            size="lg"
            show={FindShow}
            onHide={() => setFindShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
         >
            <img src="/assets/images/showtest.png" />
         </Modal>


         <Modal
            size="md"
            show={GiftShow}
            onHide={() => setGiftShow(false)}
            aria-labelledby="example-modal-sizes-title-md"
            centered
            className="modalMove"
         >
            <div className="jumpBody">
               <div className="jumpTitle"><span className="jumpTotle"> 結算版</span></div>
               <div className="jumpGet">獲得％數： <span className="jumpScore">123</span></div>
               <div className="jumpGet">獲得積分： <span className="jumpScore">123</span></div>
               <button className="jumpClose" onClick={()=>{setGiftShow(false)}}>關閉</button>
            </div>
         </Modal>
      </>
   );
}


export default GameDailyRun;