import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./components/AuthProvider/AuthProvider";

function App() {
 
  const queryClient = new QueryClient();
  

  return (
    <>
     <Toaster/>
        <QueryClientProvider client={queryClient}>
           <AuthProvider>
           <RouterProvider router={router}></RouterProvider>
           </AuthProvider>
       </QueryClientProvider>
    
     
    </>
  )
}

export default App
