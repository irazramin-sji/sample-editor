import axios, {CancelToken} from "axios";
import { useEffect, useState } from "react";
import { userHeader } from "../../shared/functions/Token";
import { BACKEND_URL } from "../../shared/constants/Variables";

export function getStories() {

    const [working, setWorking] = useState(true);
    const [stories, setStories] = useState([]);
    // const [error, setError] = useState("");
    useEffect(() => {
      setWorking(true);
      setStories({});
    //   setError("");
      let cancel;
      axios({
        method: "GET",
        url: `${BACKEND_URL}/profile/story/get-stories`,
        headers: userHeader(),
        cancelToken: new CancelToken((c) => (cancel = c)),
      })
        .then(({ data }) => {
          setStories(data);
          setWorking(false);
        })
        .catch((err) => {
        //   if (axios.isCancel(error)) {
        //     return;
        //   } else {
        //     setError(err.response?.data?.message || "Something went wrong.");
        //     setWorking(false);
        //     return;
        //   }

        console.log(err);
        });
      return () => cancel();
    }, []);
  
    return { stories, working, setStories };
  }