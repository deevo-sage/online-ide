import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";
import axios from "axios";
import $ from "jquery";

require("./main.css");
const options = {
  method: "GET",
  url: "https://judge0-ce.p.rapidapi.com/about",
  headers: {
    "x-rapidapi-key": "5ecd1876a1mshfb7fde4c4b5d153p194d2fjsn4d2d21292e9d",
    "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
  },
};

const App = () => {
  const [color, setcolor] = useState("#607d8b");
  const [size, setsize] = useState("18");
  const func = async () => {
    await axios
      .request(options)
      .then(function (response) {
      })
      .catch(function (error) {
      });
    await axios.get("https://ce.judge0.com/languages/").then((response) => {
    });
  };

  useEffect(() => {
    func();
  }, []);
  return (
    <Router>
      <Main
        path="/"
        color={color}
        setcolor={setcolor}
        size={size}
        setsize={setsize}
      />
      {/* <Setting
        path="/settings/"
        color={color}
        setcolor={setcolor}
        size={size}
        setsize={setsize}
      /> */}
    </Router>
  );
};
const Main = ({ color, setcolor, size, setsize }) => {
  const [input, setinput] = useState("");
  const [text, settext] = useState("");
  const [val, setval] = useState("54");
  const [token, settoken] = useState("");
  const [output, setoutput] = useState("");
  const [error, seterror] = useState("");
  const [status, setstatus] = useState("");
  const [outputval, setoutputval] = useState("output comes here");
  const [data, setdata] = useState();
  const get = async () => {
    const options = {
      method: "GET",
      url: "https://judge0-ce.p.rapidapi.com/submissions/" + token,
      params: { base64_encoded: "false", fields: "stdout,stderr,status" },
      headers: {
        "x-rapidapi-key": "5ecd1876a1mshfb7fde4c4b5d153p194d2fjsn4d2d21292e9d",
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
      },
    };
    if (token !== "") {
      await axios
        .request(options)
        .then(function (response) {
          // setdata(response.data);
          seterror(response.data.stderr);
          setoutput(response.data.stdout);
          setstatus(response.data.status);
        })
        .catch(function (error) {
        });
    }
  };
  const Run = async () => {
    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: { base64_encoded: "false", fields: "*" },
      headers: {
        "content-type": "application/json",
        "x-rapidapi-key": "5ecd1876a1mshfb7fde4c4b5d153p194d2fjsn4d2d21292e9d",
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
      },
      data: {
        language_id: parseInt(val),
        source_code: text,
        stdin: input,
      },
    };
    await axios
      .request(options)
      .then(function (response) {
        settoken(response.data.token);
      })
      .catch(function (error) {
      });
  };
  useEffect(() => {
    get();
  }, [token]);
  useEffect(() => {
    if (data) {
      seterror(data.stderr);
      setoutput(data.stdout);
      setstatus(data.status);
    }
  }, [data]);
  useEffect(() => {
    if (status !== "") {
      setoutputval(
        "status:" +
          status.description +
          "\n" +
          "\nerror:" +
          error +
          "\n" +
          "\noutput:-" +
          "\n" +
          output
      );
    }
  }, [status]);
  return (
    <div
      className="main"
      path="/"
      style={{ color: color, fontSize: size + "px" }}
    >
      <div className="header">
        <div className="language-switch button">
          <select
            id="languages"
            className="dropdown"
            value={val}
            onChange={async (e) => {
              setval(e.target.value);
            }}
          >
            <option value="54">C++</option>
            <option value="62">Java</option>
            <option value="71">Python</option>
          </select>
        </div>
        <div className="token">
          <input placeholder="your Output token" disabled value={token} />
          <span onClick={get}>
            <Arrow />
          </span>
        </div>
        <div className="right-buttons ">
          <div className="run button" onClick={Run}>
            {" "}
            <Play />
            RUN
          </div>
          {/*  <Link to="/settings/">
             <div className="settings button">
              <Cog />
            </div>
          </Link> */}
        </div>
      </div>
      <div className="main-body">
        <div className="code-block">
          <textarea
            id="data"
            className="codearea"
            placeholder="Code goes here"
            value={text}
            onChange={(e) => {
              settext(e.target.value);
            }}
          ></textarea>
        </div>
        <div className="body-right">
          <div className="input-box box">
            <textarea
              className="codearea"
              value={input}
              placeholder="This is the input box"
              onChange={(e) => {
                setinput(e.target.value);
              }}
            ></textarea>
          </div>
          <div className="output-box box" placeholder="This is the output box">
            {" "}
            <textarea
              className="codearea"
              value={outputval}
              placeholder="This is the Output box"
              disabled
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};
const Setting = ({ color, setcolor, size, setsize }) => {
  const [color2, setcolor2] = useState("");
  const [size2, setsize2] = useState("");

  return (
    <div>
      <div className="main">
        <input
          value={color}
          onChange={(e) => {
            setcolor(e.target.value);
          }}
        />
        <input
          value={size2}
          onChange={(e) => {
            setsize2(e.target.value);
            setsize(size2);
          }}
        />
      </div>
    </div>
  );
};

const Play = () => {
  return (
    <svg
      width="1.5rem"
      height="1.5rem"
      viewBox="0 0 25 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.6402 21.2924L4.08362 35.8499C2.42394 37.0841 0.294006 35.5897 0.294006 33.1017V3.98649C0.294006 1.50239 2.42086 0.00404774 4.08362 1.24215L23.6402 15.7997C24.0178 16.0762 24.3316 16.4759 24.5499 16.9582C24.7682 17.4405 24.8831 17.9883 24.8831 18.546C24.8831 19.1038 24.7682 19.6516 24.5499 20.1339C24.3316 20.6162 24.0178 21.0159 23.6402 21.2924V21.2924Z"
        fill="#425B67"
      />
    </svg>
  );
};

const Cog = () => {
  return (
    <svg
      width="1.5rem"
      height="1.5rem"
      viewBox="0 0 42 43"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.287081 28.5327L4.57704 35.9717C4.86185 36.4651 5.3305 36.8249 5.87996 36.9721C6.42941 37.1193 7.01468 37.0417 7.50708 36.7564L10.5015 35.0235C11.7456 36.0061 13.1205 36.8123 14.5662 37.4143V40.85C14.5662 41.4202 14.7922 41.9671 15.1945 42.3703C15.5967 42.7735 16.1423 43 16.7112 43H25.2911C25.86 43 26.4056 42.7735 26.8078 42.3703C27.2101 41.9671 27.4361 41.4202 27.4361 40.85V37.4143C28.8931 36.8063 30.2606 36.0019 31.5008 35.0235L34.4952 36.7564C35.5184 37.3477 36.8354 36.9929 37.4253 35.9717L41.7152 28.5327C41.9975 28.0386 42.0736 27.4527 41.927 26.9026C41.7804 26.3526 41.4228 25.8828 40.9323 25.5958L37.9894 23.8908C38.2193 22.3052 38.2179 20.6944 37.9851 19.1092L40.928 17.4043C41.949 16.813 42.3029 15.4908 41.7109 14.4674L37.421 7.02835C37.1362 6.53492 36.6675 6.17506 36.118 6.0279C35.5686 5.88074 34.9833 5.95833 34.4909 6.2436L31.4965 7.9765C30.2579 6.99691 28.8909 6.19246 27.4339 5.5857V2.15C27.4339 1.57978 27.208 1.03292 26.8057 0.62972C26.4034 0.226517 25.8578 0 25.289 0H16.709C16.1402 0 15.5946 0.226517 15.1923 0.62972C14.7901 1.03292 14.5641 1.57978 14.5641 2.15V5.5857C13.107 6.19374 11.7395 6.99808 10.4993 7.9765L7.50708 6.2436C7.26334 6.10206 6.99415 6.01008 6.71492 5.97292C6.43568 5.93576 6.15187 5.95415 5.87973 6.02704C5.60759 6.09993 5.35246 6.22588 5.12893 6.3977C4.9054 6.56951 4.71786 6.78382 4.57704 7.02835L0.287081 14.4674C0.00477583 14.9614 -0.0713463 15.5473 0.0752918 16.0974C0.22193 16.6474 0.579451 17.1172 1.07 17.4043L4.01291 19.1092C3.78154 20.6946 3.78154 22.3054 4.01291 23.8908L1.07 25.5958C0.0489884 26.187 -0.304933 27.5093 0.287081 28.5327V28.5327ZM20.999 12.9C25.7308 12.9 29.5789 16.7571 29.5789 21.5C29.5789 26.2429 25.7308 30.1 20.999 30.1C16.2672 30.1 12.4191 26.2429 12.4191 21.5C12.4191 16.7571 16.2672 12.9 20.999 12.9Z"
        fill="#425B67"
      />
    </svg>
  );
};
const Arrow = () => {
  return (
    <svg
      width="8"
      height="15"
      viewBox="0 0 8 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.00005 1.37C2.83297 1.1565 2.58791 1.01812 2.3188 0.985303C2.04968 0.952484 1.77855 1.02791 1.56505 1.195C1.35155 1.36209 1.21317 1.60714 1.18035 1.87626C1.14753 2.14537 1.22297 2.4165 1.39005 2.63L5.71005 8L1.23005 13.36C1.14585 13.461 1.08241 13.5777 1.04337 13.7033C1.00432 13.8289 0.990439 13.961 1.00251 14.092C1.01459 14.223 1.05239 14.3503 1.11374 14.4666C1.17509 14.583 1.25879 14.6861 1.36005 14.77C1.53996 14.9191 1.7664 15.0005 2.00005 15C2.14696 15.0002 2.29212 14.9681 2.4252 14.9059C2.55829 14.8437 2.67603 14.7529 2.77005 14.64L7.77005 8.64C7.91713 8.46107 7.99754 8.23663 7.99754 8.005C7.99754 7.77338 7.91713 7.54893 7.77005 7.37L3.00005 1.37Z"
        fill="black"
      />
    </svg>
  );
};
render(<App />, document.getElementById("root"));
