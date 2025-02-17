import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface AssetData {
  name: string;
  value: number;
  color: string;
}

const data: AssetData[] = [
  { name: "BTC", value: 65, color: "#3380FF" },
  { name: "ETH", value: 20, color: "#B1D3FF" },
  { name: "ADA", value: 10, color: "#00C4DF" },
  { name: "Others", value: 5, color: "#155AB6" },
];

export const AssetsCard = () => {
  const chartOptions: ApexOptions = {
    chart: {
      type: "donut",
      animations: {
        enabled: true,
        speed: 500,
        animateGradually: {
          enabled: true,
          delay: 350,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    stroke: {
      width: 0,
    },
    colors: data.map((item) => item.color),
    labels: data.map((item) => item.name),
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
        },
        expandOnClick: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (value: number) => `${value}%`,
      },
      theme: "light",
      style: {
        fontSize: "12px",
      },
    },
    states: {
      hover: {
        filter: {
          type: "none",
        },
      },
    },
  };

  const series = data.map((item) => item.value);

  return (
    <div className="flex flex-col w-full h-full bg-background rounded-xl p-4 sm:p-5 shadow-sm justify-between">
      <h2 className="text-text-color font-semibold text-[16px] sm:text-[18px] md:text-[19px]">
        Assets
      </h2>
      <div className="">
        <Chart
          options={chartOptions}
          series={series}
          type="donut"
          height="100%"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 ">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-1.5 sm:gap-2 cursor-pointer group bg-[#0062ff1f] px-2 sm:px-[6px] py-1 rounded-md"
          >
            <div
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm transform"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-[11px] font-medium text-text-color whitespace-nowrap">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
