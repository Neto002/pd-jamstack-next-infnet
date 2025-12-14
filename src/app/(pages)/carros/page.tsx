import CarrosView from "./view";
import { getCarros } from "@/app/services/car";

const CarrosPage: React.FC = () => {
  return <CarrosView carros={getCarros()} />;
};

export default CarrosPage;
