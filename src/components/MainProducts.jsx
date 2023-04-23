import React, { useState } from "react";
import Products from "./Products";
import { useQueryClient } from "@tanstack/react-query";

export default function MainProducts() {
  const [showLeftProducts, setShowLeftProducts] = useState(true);
  const [showRightProducts, setShowRightProducts] = useState(true);
  const client = useQueryClient();
  return (
    <main className="container">
      <div>
        {showLeftProducts && <Products />}
        <button
          onClick={() => {
            setShowLeftProducts((show) => !show);
          }}
        >
          Toggle
        </button>
      </div>
      <div>
        {showRightProducts && <Products />}
        <button onClick={() => setShowRightProducts((show) => !show)}>
          Toggle
        </button>
      </div>
      <button
        // 만역 정보가 업데이트 되어서 (클라이언트에서 새로운 정보를 post함) 서버의 어떤 정보를 업데이트하려면 해당하는 키에 한해서 //!캐쉬를invalidateQueries=새로고침 할수 있다..
        //* staleTime사용해서 이미 캐쉬해서 가지고 있어도 버튼을 누르므로써 ["products", false] 키를 가진 데이터를 다시 fetch
        //먼저 위에서 client가져와야해
        //버튼을 누르면 우리의 데이터를 invalidate(무효)하게 만들꺼다
        //invalidateQueries([무효화할 데이터])
        onClick={() => {
          client.invalidateQueries(["products", false]);
        }}
      >
        정보가 업데이트 되었음
      </button>
    </main>
  );
}
