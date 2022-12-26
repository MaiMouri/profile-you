import {
  ChakraProvider,
  Heading,
  Container,
  Text,
  Link,
  Wrap,
  Input,
  Stack,
  Button,
  Image,
  SkeletonCircle,
  SkeletonText

}
  from "@chakra-ui/react"
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState, createContext } from "react";
import Keywords from "./components/Keywords";
import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Keyword from "./components/Keyword";
import Login from "./components/Login";
import { selectKeyword, fetchItems, postKeyword, delKeyword } from './keywordsSlice';
import { logout } from "./redux/feature/user/userSlice";


export const userToken = createContext();

const App = () => {
  const navigate = useNavigate();
  const [image, updateImage] = useState();
  const [word, updateWord] = useState();
  const [loading, updateLoading] = useState();
  const [keywords, setKeywords] = useState([]);
  const [keyword, setKeyword] = useState({
    Id: 0,
    Word: "",
    Description: "",
    ImageUrl: "",
    KeywordId: ""
  });
  
  const [jwtToken, setJwtToken] = useState("");
  const value = { jwtToken, setJwtToken };
  const [alertMessage, setAlertMessage] = useState("");
  const [alertClassName, setAlertClassName] = useState("d-none");


  
  //useSelectorでstoreの中のstateにアクセスできる。usersはreducer名
  const { loadingNow, error, items } = useSelector(selectKeyword);
  // const keywordList = useSelector((state) => state.keywords.value);
  const dispatch = useDispatch();
  
  const handleLogout = () => {
    console.log("User logout");
    dispatch(logout());
    navigate("/login");
  }
  // START FETCHING
  useEffect(() => {
    dispatch(fetchItems());
    // const headers = new Headers();
    // headers.append("Content-Type", "application/json");

    // const requestOptions = {
    //   method: "GET",
    //   headers: headers,
    // }

    // fetch(`http://localhost:8080/keywords`, requestOptions)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setKeywords(data);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })
  }, [dispatch]);
  // FINISH FETCHING

  // DELETE
  function confirmDelete(id) {

    Swal.fire({
      title: 'Delete keyword?',
      text: "You cannot undo this action!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(delKeyword(id));
        // let headers = new Headers();
        // headers.append("Content-Type", "application/json");
        // // headers.append("Authorization", "Bearer " + jwtToken)

        // const requestBody = keyword;
        // requestBody.KeywordId = id;

        // const requestOptions = {
        //   method: "POST",
        //   headers: headers,
        //   body: JSON.stringify(requestBody)
        // };
        
        // const url = `http://localhost:8080/keyword/delete/`;
        // console.log(requestOptions);
        // fetch(url, requestOptions)
        //   .then((response) => response.json())
        //   .then((data) => {
        //     if (data.error) {
        //       console.log(data.error);
        //     } else {
        //       setKeywords((keywords) => keywords.filter((keyword) => keyword.KeywordId !== data.data));
        //     }
        //   })
        //   .catch(err => {
        //     console.log(err);
        //   });
      }
    });
  }
    // FINISH DELETE

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log({ word });
      generate(word)
    };

  const generate = async (word) => {
    updateLoading(true);
    const newKeyword = {
      Word: word,
      Description: "",
      ImageUrl: "",
      KeywordId: "",
    }
    dispatch(postKeyword(newKeyword));
    // const result = await axios.get(`http://localhost:8080/keyword/create/${word}`);
    // updateImage(result.data);
    
    // const requestBody = keyword;
    // requestBody.word = word;
    
    // let headers = new Headers();
    // headers.append("Content-Type", "application/json");
    //     // headers.append("Authorization", "Bearer " + jwtToken)
    // const requestOptions = {
    //   method: "POST",
    //   headers: headers,
    //   body: JSON.stringify(requestBody)
    // };

    //     const url = `http://localhost:8080/keyword/create/${word}`;
    //     fetch(url, requestOptions)
    //       .then((response) => response.json())
    //       .then((data) => {
    //         if (data.error) {
    //           console.log(data.error);
    //         } else {
    //           console.log(data)
    //           setKeywords([...keywords,
    //             data.data,
    //           ]);
    //           // tentative first aid
    //           // window.location.reload();
    //           navigate("/keywords")
    //         }
    //       })
    updateWord("")
    updateLoading(false);
  };


  return (
    <ChakraProvider>
      <Container>
        <div className="col text-end pb-3">
          <div style={{'marginBottom':'4px'}}>
            {localStorage.getItem("userToken") === null ? (
              <Link href="/login">
                <span className="badge bg-success">Login</span>
              </Link>
            ) : (
              <a href="#!" onClick={handleLogout}>
                <span className="badge bg-danger">Logout</span>
              </a>
            )}
          </div>
          <hr className="mt-3"></hr>
        </div>
        <Heading className="h1">Profile You🚀</Heading>
        <Text marginBottom={"10px"}>
          This application examines the trend of the given word in Twitter to generate images
          using the Dall・E API. More information can be found here{" "}
          <Link href={"#"}>
            Web
          </Link>
        </Text>
        <div className="App">
          Profile You!
        </div>
        <Wrap marginBottom={"10px"}>
          <form method="post" onSubmit={handleSubmit}>
            <Input
              id="word"
              value={word}
              name="word"
              onChange={(e) => updateWord(e.target.value)}
              width={"350px"}
            ></Input>
            <Button type="submit" colorScheme={"yellow"}>
              Generate
            </Button>
          </form>
        </Wrap>

        {loading ? (
          <Stack>
            <SkeletonCircle />
            <SkeletonText />
          </Stack>
        ) : image ? (
          // <Image src={`data:image/png;base64,${image}`} boxShadow="lg" />
          <Image src={image} boxShadow="lg" />
        ) : null}



        {/* Outletは共通NavBarとかを望むとき */}
        {/* <Outlet context={{keywords, confirmDelete}}/> */}
        {/* Routeの一部にしない下記の記述は居座るから🆖 */}
        {/* <Keywords keywords={keywords} confirmDelete={confirmDelete}/> */}
        {/* このルーティングめちゃくちゃ苦労した　何だこれ */}
        <userToken.Provider value={value}>
        <Routes>
          <Route path={`/login`} element={<Login />} context={{
              jwtToken,
              setJwtToken,
              setAlertClassName,
              setAlertMessage,
              // toggleRefresh,
            }}/>
          {/* <Route path={`/keywords`} element={<Keywords keywords={keywords} confirmDelete={confirmDelete}/>} /> */}
          <Route path={`/keywords`} element={<Keywords keywords={items} confirmDelete={confirmDelete}/>} />
          <Route path={`/keywords/:id`} element={<Keyword />} dispatch={dispatch} />
        </Routes>
        </userToken.Provider>


      </Container>
    </ChakraProvider>
  );
}

export default App;

