import { useEffect, useState } from "react";
import "./App.css";

type ApiResponse = {
  p: number; // current price
  o: number; // open
  h: number; // high
  l: number; // low
  d: number; // price change
  dp: number; // percentage change
};

const App: React.FC = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          "https://call4.tgju.org/ajax.json?rev=zuTA2YHED61apdEAeVZC3Mek3efTgTuKKuOOU3pqLuDoEwwTAY7sQLSUgank",
          {
            method: "GET",
            headers: {
              accept: "*/*",
              "accept-language":
                "en-US,en;q=0.9,fa-IR;q=0.8,fa;q=0.7,de;q=0.6,ar;q=0.5",
              origin: "https://www.tgju.org",
              referer: "https://www.tgju.org/",
              "user-agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.7103.48 Safari/537.36",
            },
          }
        );

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const json = await res.json();
        setData(json?.current?.tgju_gold_irg18);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price);
  };

  const getPriceChangeColor = (change: number) => {
    return change >= 0 ? "text-green-400" : "text-red-400";
  };

  const getPriceChangeIcon = (change: number) => {
    return change >= 0 ? "▲" : "▼";
  };


  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 !p-3"
      dir="rtl"
    >
      <div className="max-w-sm mx-auto ">
        {/* Header */}
        <div className="text-center !mb-6 !pt-4  ">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 !mb-2 font-vazir">
            🪙 قیمت طلا
          </h1>
          <p className="text-slate-300 !tracking-widest text-lg font-vazir">
            اطلاعات زنده از
            <a
              href="https://www.tgju.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              tgju.org
            </a>
          </p>
        </div>

        {/* Loading State */}
        {loading && !data && (
          <div className=" w-full h-full flex flex-col items-center justify-center py-16">
            {/* Rotating Gold Coin */}
            <div className="relative mb-6">
              <div className="w-20 h-20 flex items-center justify-center">
                <span className="text-6xl animate-spin-slow">🪙</span>
              </div>
              {/* Glow Effect */}
              <div className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-25 animate-pulse blur-lg"></div>
            </div>

            {/* Loading Text */}
            <div className="text-center">
              <p className="text-yellow-300 font-semibold text-lg mb-2 font-vazir">
                در حال بارگذاری...
              </p>
              <p className="text-slate-400 text-lg font-vazir">
                لطفاً صبر کنید
              </p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-gradient-to-r from-red-900/80 to-red-700/80 backdrop-blur-sm border border-red-500/50 rounded-2xl p-4 mb-4 shadow-xl">
            <div className="flex items-center justify-center">
              <span className="text-2xl mr-2">⚠️</span>
              <p className="text-red-100 text-center font-medium font-vazir">
                خطا: {error}
              </p>
            </div>
          </div>
        )}

        {/* Gold Prices Table */}
        {data && (
          <div className="space-y-3 flex flex-col justify-center  w-full  h-full items-center ">
            {/* Table Container */}
            <div className=" flex flex-col justify-center  w-full  h-full items-center bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/10">
              {/* Table Header */}
              <div className=" flex flex-col justify-center  w-full  h-full items-center bg-gradient-to-r from-yellow-600 to-orange-600 !p-3">
                <h2 className="text-center text-white font-bold text-2xl font-vazir">
                  📊 جدول قیمت‌های طلا
                </h2>
              </div>

              {/* Table Body */}
              <div className="!p-3 !space-y-2  w-full  h-full items-center  ">
                {/* Current Price */}
                <div
                  className={`flex justify-between items-center !p-3 rounded-xl border transition-all duration-300 ${
                    data.dp >= 0
                      ? "bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-green-500/30 hover:from-green-600/30 hover:to-emerald-600/30"
                      : "bg-gradient-to-r from-red-600/20 to-pink-600/20 border-red-500/30 hover:from-red-600/30 hover:to-pink-600/30"
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">📈</span>
                    <span className="text-slate-200 font-medium text-lg font-vazir">
                      قیمت فعلی
                    </span>
                  </div>
                  <div className="text-left">
                    <div
                      className={`text-2xl font-bold font-vazir ${
                        data.dp >= 0 ? "text-green-300" : "text-red-300"
                      }`}
                    >
                      {formatPrice(data.p)}
                    </div>
                    <div className="text-xs text-slate-300 font-vazir">
                      ریال
                    </div>
                  </div>
                </div>

                {/* Price Change */}
                <div
                  className={`flex justify-between items-center !p-3 rounded-xl border transition-all duration-300 ${
                    data.dp >= 0
                      ? "bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-green-500/30 hover:from-green-600/30 hover:to-emerald-600/30"
                      : "bg-gradient-to-r from-red-600/20 to-pink-600/20 border-red-500/30 hover:from-red-600/30 hover:to-pink-600/30"
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">
                      {data.dp >= 0 ? "📈" : "📉"}
                    </span>
                    <span
                      className={`font-medium text-lg font-vazir ${
                        data.dp >= 0 ? "text-green-100" : "text-red-100"
                      }`}
                    >
                      تغییر قیمت
                    </span>
                  </div>
                  <div className="text-left">
                    <div
                      className={`text-lg  font-bold font-vazir ${
                        data.dp >= 0 ? "text-green-300" : "text-red-300"
                      }`}
                    >
                      {data.d >= 0 ? "+" : "-"}
                      {formatPrice(data.d)}
                    </div>
                      
                    <div
                      className={`text-xs  justify-center font-vazir ${
                        data.dp >= 0 ? "text-green-200" : "text-red-200"
                      }`}
                    >
                      (
                      {data.dp.toFixed(2)}%
                      {data.dp >= 0 ? "+" : "-"}
                      )
                    </div>
                  </div>
                </div>

                {/* High Price */}
                <div className="flex justify-between items-center !p-3 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-xl border border-blue-500/30 hover:from-blue-600/30 hover:to-cyan-600/30 transition-all duration-300">
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">⬆️</span>
                    <span className="text-blue-100 font-medium text-lg font-vazir">
                      بالاترین
                    </span>
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-bold text-blue-300 font-vazir">
                      {formatPrice(data.h)}
                    </div>
                    <div className="text-xs text-blue-200 font-vazir">ریال</div>
                  </div>
                </div>

                {/* Low Price */}
                <div className="flex justify-between items-center !p-3 bg-gradient-to-r from-red-600/20 to-pink-600/20 rounded-xl border border-red-500/30 hover:from-red-600/30 hover:to-pink-600/30 transition-all duration-300  ">
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">⬇️</span>
                    <span className="text-red-100 font-medium text-lg font-vazir">
                      پایین‌ترین
                    </span>
                  </div>
                  <div className="text-left  ">
                    <div className="text-2xl font-bold text-red-300 font-vazir">
                      {formatPrice(data.l)}
                    </div>
                    <div className="text-xs text-red-200 font-vazir">ریال</div>
                  </div>
                </div>

                {/* Opening Price */}
                {/* <div className="flex justify-between items-center !p-2 bg-gradient-to-r from-purple-600/20 to-violet-600/20 rounded-xl border border-purple-500/30 hover:from-purple-600/30 hover:to-violet-600/30 transition-all duration-300">
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">🌅</span>
                    <span className="text-purple-100 font-medium text-lg font-vazir">
                      قیمت بازگشایی
                    </span>
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-bold text-purple-300 font-vazir">
                      {formatPrice(data.o)}
                    </div>
                    <div className="text-xs text-purple-200 font-vazir">
                      ریال
                    </div>
                  </div>
                </div> */}
              </div>

              {/* Price Trend Indicator */}
              <div className="p-3 bg-gradient-to-r from-slate-800/50 to-gray-800/50 border-t border-white/5">
                {/* <div className="flex justify-center items-center">
                  <span
                    className={`text-lg mr-2 ${getPriceChangeColor(data.d)}`}
                  >
                    {getPriceChangeIcon(data.d)}
                  </span>
                  <span
                    className={`text-lg font-medium ${getPriceChangeColor(
                      data.d
                    )} font-vazir`}
                  >
                    {data.d >= 0 ? "📈 صعودی" : "📉 نزولی"}
                  </span>
                </div>
                <div className="text-center mt-2">
                  <span
                    className={`text-xs ${getPriceChangeColor(
                      data.d
                    )} font-vazir`}
                  >
                    تغییر: {formatPrice(Math.abs(data.d))} ریال (
                    {data.dp >= 0 ? "+" : ""}
                    {data.dp.toFixed(2)}%)
                  </span>
                </div> */}
              </div>
            </div>

            {/* Update Time */}
            <div className="text-center">
              <div className=" w-52 flex justify-center items-center  !px-3 !py-1.5 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 !mt-5 ">
                <span className="text-slate-300 text-lg mr-2">🕐</span>
                <span className="text-slate-300 text-lg font-vazir">
                  آخرین به‌روزرسانی: {new Date().toLocaleTimeString("fa-IR")}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
