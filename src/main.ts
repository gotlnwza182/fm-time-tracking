const dailyBtn = document.getElementById("dailyBtn");
const weeklyBtn = document.getElementById("weeklyBtn");
const monthlyBtn = document.getElementById("monthlyBtn");

const textPrev = document.querySelectorAll("#timeText");

interface dataType {
  title: string;
  timeframes: {
    daily: { current: number; previous: number };
    weekly: { current: number; previous: number };
    monthly: { current: number; previous: number };
  };
}

let json: dataType[];

fetch("/data.json")
  .then((res) => {
    if (!res.ok) return console.log("Oops! Something went wrong.");

    return res.json();
  })
  .then((data) => {
    console.log(data);
    json = data;
  });

const handleTimeFrames = (e: any) => {
  const timeFrames = e.target.value;

  if (timeFrames === "daily") {
    for (let i = 0; i < textPrev.length; i++) {
      textPrev[
        i
      ].innerHTML = `<h1 class="text-preset-3 xl:text-preset-1">${json[i].timeframes.daily.current}hrs</h1>
            <p class="text-navy-200 text-preset-6">Yesterday - ${json[i].timeframes.daily.previous}hrs</p>`;
    }

    dailyBtn?.classList.add("text-purple-500", "text-white");
    weeklyBtn?.classList.remove("text-purple-500", "text-white");
    monthlyBtn?.classList.remove("text-purple-500", "text-white");
  }

  if (timeFrames === "weekly") {
    for (let i = 0; i < textPrev.length; i++) {
      textPrev[
        i
      ].innerHTML = `<h1 class="text-preset-3 xl:text-preset-1">${json[i].timeframes.weekly.current}hrs</h1>
            <p class="text-navy-200 text-preset-6">Yesterday - ${json[i].timeframes.weekly.previous}hrs</p>`;
    }
    dailyBtn?.classList.remove("text-purple-500", "text-white");
    weeklyBtn?.classList.add("text-purple-500", "text-white");
    monthlyBtn?.classList.remove("text-purple-500", "text-white");
  }

  if (timeFrames === "monthly") {
    for (let i = 0; i < textPrev.length; i++) {
      textPrev[
        i
      ].innerHTML = `<h1 class="text-preset-3 xl:text-preset-1">${json[i].timeframes.monthly.current}hrs</h1>
            <p class="text-navy-200 text-preset-6">Yesterday - ${json[i].timeframes.monthly.previous}hrs</p>`;
    }
    dailyBtn?.classList.remove("text-purple-500", "text-white");
    weeklyBtn?.classList.remove("text-purple-500", "text-white");
    monthlyBtn?.classList.add("text-purple-500", "text-white");
  }
};

dailyBtn?.addEventListener("click", handleTimeFrames);
weeklyBtn?.addEventListener("click", handleTimeFrames);
monthlyBtn?.addEventListener("click", handleTimeFrames);
