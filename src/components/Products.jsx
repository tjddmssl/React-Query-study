import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";
//! eact-query 는 서버 상태를 관리해주지만 Redux, MobX 같은 라이브러리들은 클라이언트 상태 / 서버 상태 구분없이 전역상태로 묶어서 관리를 한다는 점에서 다를것
/** //* useQuery를 사용한 쿼리 인스턴스는 캐쉬데이터를 stale하다고 간주한다.=> 데이터가 처음부터 stale(오래됀)하면 창이 포커스 됐을때, 새로운 인스턴스가 마운트될때, 네트워크가 다시 연결될때.. 계속계속 fetch가 됀다...=> 여러 옵션(`refetchOnMount`, `refetchOnWindowFocus`, `refetchOnReconnect`,`refetchInterval`...)을 사용한다.
 */
export default function Products() {
  const [checked, setChecked] = useState(false);

  const handleChange = () => setChecked((prev) => !prev);

  //! const {useQuery에서 제공해주는 api...공식사이트 참고}
  const {
    isLoading,
    error,
    data: products,
  } = useQuery(
    ["products", checked],
    // checked 돼면  ["products", true]에 있는 데이터가
    // checked 안돼면  ["products", false ]에 있는 데이터가 들어온다.
    () => {
      console.log("fetch....", checked);
      return fetch(`data/${checked ? "sale_" : ""}products.json`).then((res) =>
        res.json()
      );
    },
    {
      //*데이터가 처음부터 stale(오래됀)하면 창이 포커스 됐을때, 새로운 인스턴스가 마운트될때, 네트워크가 다시 연결될때.. 계속계속 fetch가 됀다...
      staleTime: 1000 * 60 * 5,
      // 캐쉬돼는 시간 정함, 즉 stale 데이터가 아닌 fresh한 data로 얼마나 가지고 있을꺼냐를 수동으로 정함..//fresh한 data면 fetch안해
      //! 무조건 긴시간을 캐쉬한다고 좋은게 아니라 이 데이터가 백엔드에서 빈번히 업데이트 돼는 지, 사용자가 오랫동안 캐쉬해도 되는지를 잘 판단해서 시간을 지정해야해
    }
  );
  //useQuery([queryKey즉 가져오는 데이터를 queryKey로 저장해 즉 캐쉬를 위한 키,세부적으로 조건을 걸수 있다.],queryFn즉 async로 데이터 받아오는 함수 )
  //검색어 키는 가져오는 데이터를 고유하게 설명하므로 검색어 함수에서 변경 하는 모든 변수(checked)를 포함해야 합니다 .
  //! 커스텀 훅을 사용했을때에는 MainProducts에서 Products을 두개 쓰고, 각각의 Products에서 fetch를 했기 때문에 두번 fetch가 일어나고, 각각 내부적으로 다른 데이터를 가지고 있었지만,// 리엑트 쿼리를 사용하면, 네트워크별로 키를제공해서 그 키 이름 아래에 메모리를 저장해...
  //! 근데 여기서는 같은 키를 사용하므로 두번째 fetch할때 그 키아래에 있는 데이터를 가져와서 쓴것 !
  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;
  return (
    <>
      <label>
        <input type="checkbox" checked={checked} onChange={handleChange} />
        Show Only 🔥 Sale
      </label>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <article>
              <h3>{product.name}</h3>
              <p>{product.price}</p>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}
