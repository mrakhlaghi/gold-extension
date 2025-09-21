import { useEffect, useState } from "react";
import "./App.css";

type ApiResponse = {
  c: number; // current
  o: number; // open
  h: number; // high
  l: number; // low
};

const App1: React.FC = () => {
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

  const getPriceChangeColor = (current: number, open: number) => {
    return current >= open ? "text-green-400" : "text-red-400";
  };

  const getPriceChangeIcon = (current: number, open: number) => {
    return current >= open ? "▲" : "▼";
  };

  return (
    <div className=" bg-gray-900 text-gray-100 p-4" dir="rtl">
      <div className="max-w-md mx-auto">
        <h1 className="text-center text-2xl font-bold mb-6">قیمت طلا</h1>

        {loading && !data && (
          <div className="text-center py-12">
            <div className="relative">
              {/* Outer ring */}
              <div className="w-16 h-16 border-4 border-gray-700 rounded-full mx-auto"></div>
              {/* Spinning ring */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-16 border-4 border-transparent border-t-yellow-400 border-r-yellow-400 rounded-full animate-spin"></div>
              {/* Center icon */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl">
                💰
              </div>
            </div>
            <div className="mt-6 space-y-2">
              <p className="text-yellow-300 font-medium text-lg">
                در حال بارگذاری...
              </p>
              <div className="flex justify-center space-x-1">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-800 border border-red-600 rounded-lg p-4 mb-4">
            <p className="text-red-200 text-center">خطا: {error}</p>
          </div>
        )}

        {data && (
          <div className="space-y-4">
            {/* کارت قیمت فعلی */}
            <div className="bg-gray-800 rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">قیمت فعلی</span>
                <span className="text-2xl font-bold text-yellow-300">
                  {formatPrice(data.c)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">ریال</span>
                <span
                  className={`text-lg ${getPriceChangeColor(data.c, data.o)}`}
                >
                  {getPriceChangeIcon(data.c, data.o)}
                </span>
              </div>
            </div>

            {/* کارت بالاترین */}
            <div className="bg-gray-800 rounded-2xl shadow-lg p-4 text-center">
              <div className="text-sm text-gray-400 mb-1">بالاترین</div>
              <div className="text-xl font-bold text-green-300">
                {formatPrice(data.h)}
              </div>
              <div className="text-xs text-gray-500">ریال</div>
            </div>

            {/* کارت پایین‌ترین */}
            <div className="bg-gray-800 rounded-2xl shadow-lg p-4 text-center">
              <div className="text-sm text-gray-400 mb-1">پایین‌ترین</div>
              <div className="text-xl font-bold text-red-300">
                {formatPrice(data.l)}
              </div>
              <div className="text-xs text-gray-500">ریال</div>
            </div>

            {/* کارت قیمت بازگشایی */}
            <div className="bg-gray-800 rounded-2xl shadow-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 font-medium">قیمت بازگشایی</span>
                <span className="text-lg font-bold text-yellow-300">
                  {formatPrice(data.o)}
                </span>
              </div>
              <div className="text-xs text-gray-500 text-center mt-2">ریال</div>
            </div>

            <div className="text-center text-xs text-gray-500 mt-4">
              آخرین به‌روزرسانی: {new Date().toLocaleTimeString("fa-IR")}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App1;
