import Link from "next/link";
import { GoArrowRight } from "react-icons/go";

export default async function ElectricityStart() {
  // Get the current date and time
  const currentDate = new Date();

  // Extract the year, month, and day
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
  const day = String(currentDate.getDate()).padStart(2, "0");

  // Construct the API URL using the current date
  const apiUrl = `https://www.elprisetjustnu.se/api/v1/prices/${year}/${month}-${day}_SE3.json`;

  // Fetch data from the API
  let data = await fetch(apiUrl);
  let posts = await data.json();

  // Find the current price based on the current time
  const currentPrice = posts.find((post: any) => {
    const timeStart = new Date(post.time_start);
    const timeEnd = new Date(post.time_end);
    return currentDate >= timeStart && currentDate < timeEnd;
  });

  // If no current price is found, set a default value (optional)
  const priceToShow = currentPrice
    ? currentPrice.SEK_per_kWh.toFixed(2)
    : "N/A";

  console.log("Posts", posts);
  console.log("Current Price", priceToShow);

  return (
    <div className="relative border rounded-md shadow-md">
      <span className="absolute text-xs bg-orange-400 rounded-sm py-1 px-3 top-[-10px] left-[10px]">
        Electricity
      </span>
      <section className="flex items-center justify-center pt-6">
        <div className="flex flex-col items-center justify-center">
          <p className="text-sm">Just nu</p>
          <span className="font-bold text-5xl my-2">{priceToShow}</span>
          <p className="text-sm">kr/kWh</p>
        </div>
      </section>
      <Link href="/electricity" className="flex items-center justify-end">
        <GoArrowRight className="w-8 h-8 bg-white text-blue-950 p-2 rounded-tl-xl" />
      </Link>
    </div>
  );
}
