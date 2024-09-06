import Economy from "./components/economy/Economy";
import ElectricityStart from "./components/electricity/ElectricityStart";

export default function Home() {
  return (
    <div className="px-5 py-6 ">
      <ElectricityStart />
      <Economy />
    </div>
  );
}
