import { useEffect, useState } from "react";

//* 훅은 값의 재사용이 아니라 로직의 재사용을 위한 것이다.
//* 이 커스텀 훅을 사용 하는 컴포넌트마다 내부 상태들이 다 각각 다르게 설정이 돼...
//!  커스텀 훅의 문제 => 1) 캐쉬가 안돼...네트워크에서 받아온 데이터를 따로 저장하는게 아니라 이 훅을 호출할때마다 다시 데이터를 받아오는 형식,
//! 2)네트워크 통신에 실패하면 에러가 뜨지만,다시 재시도할수 기능이 없어..
//! 리엑트쿼리는  비동기에 관한 상태 라이브러리(reducer필요없어)//한번 데이터를 불러오면 얼마동안 이 데이터를 가지고 있을지 캐쉬설정이돼고, 에러 로딩 기능 뿐아니라 에러가 뜨면 다시 재시도할수 있는 기능이 됀다 => 네트워크 통신이나 비동기적으로 데이터를 관리해야 하는경우 매우 좋다.

export default function useProducts({ salesOnly }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    console.log("fetching....");
    setLoading(true);
    setError(undefined);
    fetch(`data/${salesOnly ? "sale_" : ""}products.json`)
      .then((res) => res.json())
      .then((data) => {
        console.log("🔥뜨끈한 데이터를 네트워크에서 받아옴");
        setProducts(data);
      })
      .catch((e) => setError("에러가 발생했음!"))
      .finally(() => setLoading(false));
    return () => {
      console.log("🧹 깨끗하게 청소하는 일들을 합니다.");
    };
  }, [salesOnly]);

  return [loading, error, products];
}
