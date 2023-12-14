import { extendTheme } from "@chakra-ui/react"
import "@fontsource/open-sans/300.css"
import "@fontsource/open-sans/400.css"
import "@fontsource/open-sans/700.css"
import styles from '@/styles/Home.module.css';
// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  colors: {
    brand: {
      100: "#9f00c5",
      // ...
      900: "#1a202c",
    },
  },
  fonts:{
    body: "Open Sans, sans-serif",
  },
  styles:{
    global:()=>(
      {
        body:{
          bg:"#b39eb5",
        },
      }
    ),
  },
  components:{
    //buttons
  },
})

