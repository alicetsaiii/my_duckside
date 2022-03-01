// ----- 巧琳 ----- //

import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Axios from "axios";
import "../css/member_style.css";

let MemberInfo = () => {
  //********************
  //載入頁面後取得會員資料
  useEffect(
    () => {
      let getMemberInfo = async () => {
        await Axios.post("http://localhost:5000/account/list", {
          acc_email: localStorage.getItem("loginState"),
        }).then((result) => {
          setMemberInfo({ ...memberInfo, name: result.data.acc_name });
        });
      };
      getMemberInfo();
      if (localStorage.getItem("loginState") === null) {
        setViweChange({
          ...viweChange,
          membershow: "none",
          forgetshow: "block",
        });
      } else {
        setViweChange({
          ...viweChange,
          membershow: "block",
          forgetshow: "none",
        });
      }
    },
    []
    //箭頭函示多給一個[]只會執行一次
  );

  //********************
  //State
  // viweChange
  let [viweChange, setViweChange] = useState({
    membershow: "block", //block/none
    forgetshow: "none",
  });
  //memberInfo
  let [memberInfo, setMemberInfo] = useState({
    email: localStorage.getItem("loginState"),
    name: "",
  });
  //changeInfo
  let [changeInfo, setChangeInfo] = useState({
    name: "",
    password: "",
    newpassword: "",
    againnewpassword: "",
  });
  // noticeState
  let [passwordNoticeState, setPasswordNoticeState] = useState({
    show: "none", //block/none
    text: "",
    color: "", //text-danger/text-success
  });

  //********************
  // function
  //會員暱稱input
  let nameInpChange = async (e) => {
    await setChangeInfo({ ...changeInfo, name: e.target.value });
  };
  //會員舊密碼input
  let passwordInpChange = async (e) => {
    setPasswordNoticeState({
      ...passwordNoticeState,
      show: "none",
      text: "",
      color: "text-danger",
    });
    await setChangeInfo({ ...changeInfo, password: e.target.value });
  };
  //會員新密碼input
  let nwepasswordInpChange = async (e) => {
    setPasswordNoticeState({
      ...passwordNoticeState,
      show: "none",
      text: "",
      color: "text-danger",
    });
    await setChangeInfo({ ...changeInfo, newpassword: e.target.value });
  };
  //會員重複新密碼input
  let againNwepasswordInpChange = async (e) => {
    setPasswordNoticeState({
      ...passwordNoticeState,
      show: "none",
      text: "",
      color: "text-danger",
    });
    await setChangeInfo({ ...changeInfo, againnewpassword: e.target.value });
  };

  //送出button
  let nameButClick = async () => {
    await Axios.put("http://localhost:5000/account/updatename", {
      acc_email: memberInfo.email,
      acc_name: changeInfo.name,
    }).then(() => {
      window.location = "/member/info";
    });
  };
  let passwordButClick = async () => {
    await Axios.post("http://localhost:5000/account/login", {
      acc_email: memberInfo.email,
      acc_password: changeInfo.password,
    }).then((result) => {
      //檢查欄位是否填寫
      if (
        (changeInfo.password === "") |
        (changeInfo.newpassword === "") |
        (changeInfo.againnewpassword === "")
      ) {
        setPasswordNoticeState({
          ...passwordNoticeState,
          show: "block",
          text: "密碼欄位不可留白，更改失敗!",
          color: "text-danger",
        });
      } else {
        //錯誤舊密碼
        if (result.data === "Password error") {
          setPasswordNoticeState({
            ...passwordNoticeState,
            show: "block",
            text: "舊密碼錯誤，更改失敗！",
            color: "text-danger",
          });
        } else if (
          //成功更改密碼
          result.data === "Password correct" &&
          changeInfo.newpassword === changeInfo.againnewpassword
        ) {
          Axios.put("http://localhost:5000/account/updatepassword", {
            acc_email: memberInfo.email,
            acc_password: changeInfo.newpassword,
          }).then((result) => {
            console.log(result.data);
          });
          setPasswordNoticeState({
            ...passwordNoticeState,
            show: "block",
            text: "密碼更改成功!",
            color: "text-success",
          });
          //清除input資料
          setChangeInfo({
            ...changeInfo,
            password: "",
            newpassword: "",
            againnewpassword: "",
          });
        } else {
          //錯誤新密碼兩次不相同
          setPasswordNoticeState({
            ...passwordNoticeState,
            show: "block",
            text: "請確認兩次新密碼輸入是否相同，更改失敗！",
            color: "text-danger",
          });
        }
      }
    });
  };

  //********************
  //State
  //forget
  let [forgetInfo, setForgetInfo] = useState({
    password: "",
    againpassword: "",
  });
  // noticeState
  let [forgetNoticeState, setForgetNoticeState] = useState({
    show: "none", //block/none
    text: "",
    color: "", //text-danger/text-success
  });
  //********************
  //function
  //忘記新密碼input
  let forgetPasswordInpChange = async (e) => {
    await setForgetInfo({ ...forgetInfo, password: e.target.value });
  };
  //忘記重複新密碼input
  let forgetAgainPasswordInpChange = async (e) => {
    await setForgetInfo({ ...forgetInfo, againpassword: e.target.value });
  };
  //送出button
  let token = useParams();
  let forgetButClick = async () => {
    //檢查欄位是否填寫
    if ((forgetInfo.password === "") | (forgetInfo.againpassword === "")) {
      setForgetNoticeState({
        ...forgetNoticeState,
        show: "block",
        text: "密碼欄位不可留白，更改失敗!",
        color: "text-danger",
      });
    } else {
      if (forgetInfo.password === forgetInfo.againpassword) {
        //成功發送密碼
        //加三秒跳轉//
        await Axios.post("http://localhost:5000/account/whoResetPass", {
          acc_token: token,
        }).then((result) => {
          console.log(result.data)
          // window.location = "/";
        });

      }else {
        //錯誤密碼格式
        setForgetNoticeState({
          ...forgetNoticeState,
          show: "block",
          text: "請確認兩次新密碼輸入是否相同，更改失敗！",
          color: "text-danger",
        });
      }
    }
  };

  //********************
  return (
    <div className="container-xl px-4 mt-4">
      <div className="row">
        {/* 會員資料維護 */}
        <div className="col-xl-4" style={{ display: viweChange.membershow }}>
          {/* <!-- Profile picture card--> */}
          <div className="card mb-4 mb-xl-0">
            <div className="card-header">會員頭像</div>
            <div className="card-body text-center">
              {/* <!-- Profile picture image--> */}
              <img
                className="img-account-profile rounded-circle mb-2 w-100"
                src="http://bootdey.com/img/Content/avatar/avatar1.png"
                alt=""
              />
              {/* <!-- Profile picture help block--> */}
              <div className="small font-italic text-muted mb-4">
                JPG or PNG no larger than 5 MB
              </div>
              {/* <!-- Profile picture upload button--> */}
              <button className="btn btn-primary" type="button">
                上傳照片
              </button>
            </div>
          </div>
        </div>
        <div className="col-xl-6" style={{ display: viweChange.membershow }}>
          {/* <!-- Account details card--> */}
          <div className="card mb-4">
            <div className="card-header">會員資訊</div>

            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputUsername">
                    Email
                  </label>
                  <p>{memberInfo.email}</p>
                </div>
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputUsername">
                    暱稱
                  </label>
                  <p>{memberInfo.name}</p>
                </div>
              </form>
            </div>
            {/* Name change*/}
            <div className="card-header">更改暱稱</div>

            <div className="card-body">
              <form>
                <div className="row gx-3 mb-3">
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="inputUsername">
                      請輸入新暱稱
                    </label>
                    <input
                      className="form-control"
                      id="inputFirstName"
                      type="text"
                      placeholder="想要的新暱稱"
                      onChange={nameInpChange}
                    />
                  </div>
                  <button
                    className="btn btn-primary mb-3 ml-3 mt-4"
                    type="button"
                    onClick={nameButClick}
                  >
                    更改暱稱
                  </button>
                </div>
              </form>
            </div>

            {/* Password change */}
            <div className="card-header">更改密碼</div>

            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputUsername">
                    請輸入舊密碼
                  </label>
                  <input
                    className="form-control"
                    id="inputPassword"
                    type="password"
                    placeholder="輸入舊密碼"
                    onChange={passwordInpChange}
                    value={changeInfo.password}
                  />
                </div>
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputUsername">
                    請輸入新密碼
                  </label>
                  <input
                    className="form-control"
                    id="inputNewPassword"
                    type="password"
                    placeholder="想要的新密碼"
                    onChange={nwepasswordInpChange}
                    value={changeInfo.newpassword}
                  />
                </div>
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputUsername">
                    請再次輸入新密碼
                  </label>
                  <input
                    className="form-control"
                    id="inputAgainNewPassword"
                    type="password"
                    placeholder="再打一次想要的新密碼"
                    onChange={againNwepasswordInpChange}
                    value={changeInfo.againnewpassword}
                  />
                </div>
                <span
                  className={passwordNoticeState.color}
                  style={{ display: passwordNoticeState.show }}
                >
                  {passwordNoticeState.text}
                </span>
                <button
                  className="btn btn-primary mt-2"
                  type="button"
                  onClick={passwordButClick}
                >
                  更改密碼
                </button>
              </form>
            </div>
            {/* Password change */}
          </div>
        </div>
        {/* 忘記密碼 */}
        <div className="col-xl-4" style={{ display: viweChange.forgetshow }}>
          {/* <!-- Account details card--> */}
          <div className="card mb-4">
            {/* Password forget */}
            <div className="card-header">更改密碼</div>

            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputUsername">
                    請輸入新密碼
                  </label>
                  <input
                    className="form-control"
                    id="forgetInputNewPassword"
                    type="password"
                    placeholder="想要的新密碼"
                    onChange={forgetPasswordInpChange}
                    value={forgetInfo.password}
                  />
                </div>
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputUsername">
                    請再次輸入新密碼
                  </label>
                  <input
                    className="form-control"
                    id="forgetInputAgainNewPassword"
                    type="password"
                    placeholder="再打一次想要的新密碼"
                    onChange={forgetAgainPasswordInpChange}
                    value={forgetInfo.againpassword}
                  />
                </div>
                <span
                  className={forgetNoticeState.color}
                  style={{ display: forgetNoticeState.show }}
                >
                  {forgetNoticeState.text}
                </span>
                <button
                  className="btn btn-primary mt-2"
                  type="button"
                  onClick={forgetButClick}
                >
                  更改密碼
                </button>
              </form>
            </div>
            {/* Password change */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberInfo;
