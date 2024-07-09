import { Grid } from "@mui/material";
import styles from "./page.module.css";
import Posts from "./posts/page";
import Loading from "./loading";
import { Suspense } from "react";



export default function Home() {

  return (<>
   <Grid
        sx={{ marginTop: "30px"  ,width:"95%",margin:'auto'}} container  >
          <Suspense fallback={<h1 className="loadPadd">loading</h1>}>
    <Posts />
    </Suspense>
    </Grid>
  </>)
}
