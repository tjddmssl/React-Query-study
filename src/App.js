import React from "react";
import "./App.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import MainProducts from "./components/MainProducts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/*//! QueryClientProvider :  QueryClient를 제공하고 연결하기 위해서 사용한다.
      //! client={queryClient}는 필수적, QueryClient를의 인스턴스를 제공 
      //!QueryClient: 캐쉬와 상호작용하려고 사용한다. */}
      {/* QueryClientProvider로 우산 쓰고 있는 모든 컴포넌트에서  const client = usequeryClient를 ㅣ이용해서 client가져올수 있다.*/}
      <MainProducts />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}
