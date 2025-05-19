import { useLoginStore } from "../../login/model/useLoginStore";

function Home() {
  const { loginData } = useLoginStore();
  return (
    <div className="d-flex">
      <div className="d-flex flex-column w-100">
        <h2>{`Selamat Datang ${loginData?.name}`}</h2>
      </div>
    </div>
  );
}

export default Home;
