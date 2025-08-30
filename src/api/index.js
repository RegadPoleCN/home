import axios from "axios";
import fetchJsonp from "fetch-jsonp";

/**
 * 音乐播放器
 */

// 获取音乐播放列表
export const getPlayerList = async (server, type, id) => {
  const res = await fetch(
    `${import.meta.env.VITE_SONG_API}?server=${server}&type=${type}&id=${id}`,
  );
  const data = await res.json();

  if (data[0].url.startsWith("@")) {
    // eslint-disable-next-line no-unused-vars
    const [handle, jsonpCallback, jsonpCallbackFunction, url] = data[0].url.split("@").slice(1);
    const jsonpData = await fetchJsonp(url).then((res) => res.json());
    const domain = (
      jsonpData.req_0.data.sip.find((i) => !i.startsWith("http://ws")) ||
      jsonpData.req_0.data.sip[0]
    ).replace("http://", "https://");

    return data.map((v, i) => ({
      name: v.name || v.title,
      artist: v.artist || v.author,
      url: domain + jsonpData.req_0.data.midurlinfo[i].purl,
      cover: v.cover || v.pic,
      lrc: v.lrc,
    }));
  } else {
    return data.map((v) => ({
      name: v.name || v.title,
      artist: v.artist || v.author,
      url: v.url,
      cover: v.cover || v.pic,
      lrc: v.lrc,
    }));
  }
};

/**
 * 一言
 */

// 获取一言数据
export const getHitokoto = async () => {
  let res;
  const urls = [
    "https://v1.hitokoto.cn", 
    "https://api.vvhan.com/api/ian/rand?type=json", 
    // "https://whyta.cn/api/yiyan?key=d5c296b91907", 
    "https://v2.alapi.cn/api/hitokoto?token=LwExDtUWhF3rH5ib"
  ];
  for (let i = 0; i < urls.length; i++) {
    try {
      const url = urls[i]
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const json = await response.json();
      res =  [i, json];
      break;
    } catch (error) {
      console.warn(`Failed to fetch from ${urls[i]}:`, error.message);
    }
  }
  if (res == null) throw new Error('All URLs failed');
  if (res[0]==0) {
    res[0] = res[1].hitokoto;
    res[1] = res[1].from;
  } else if (res[0]==1) {
    res[0] = res[1].data.content;
    res[1] = res[1].data.form;
  } else if (res[0]==2) {
    res[0] = res[1].hitokoto;
    res[1] = res[1].from;
  } else if (res[0]==3) {
    res[0] = res[1].data.hitokoto;
    res[1] = res[1].data.from;
  }
  return await res;
}

/**
 * 天气
 */

// 获取高德地理位置信息
export const getAdcode = async (key) => {
  const ip = await getIp();
  const res = await fetch(`https://restapi.amap.com/v3/ip?key=${key}&ip=${ip}`);
  
  return await res.json();
};

// 获取高德地理天气信息
export const getWeather = async (key, city) => {
  const res = await fetch(
    `https://restapi.amap.com/v3/weather/weatherInfo?key=${key}&city=${city}`,
  );
  return await res.json();
};

// 获取教书先生天气 API
// https://api.oioweb.cn/doc/weather/GetWeather
export const getOtherWeather = async () => {
  const res = await fetch("https://api.oioweb.cn/api/weather/GetWeather");
  return await res.json();
};

export const getIp = async () => {
  try {
    const response = await axios.get('https://ipinfo.io/json');
    return response.data.ip;
  } catch (error) {
    console.error(error);
  }
}

//获取有兽焉粉丝服务器文档404界面文字
export const get404Msg = async () => {
  let msg = [];
  await axios.get("https://gh-proxy.com/https://raw.githubusercontent.com/ZoruaFox/ysy-fanserver-helppage/refs/heads/master/docs/.vuepress/notFoundMsg.ts")
  .then(response => {
    const regex = /notFoundMsg\s*=\s*\[\s*(?:(["'])(.*?)\1\s*,?\s*)*\]/g
    msg = regex.exec(response.data)[0].match(/"([^"]*)"/g)
    .map(s => s.replace(/"/g, ''));
  })  
  .catch(error => {
    console.log(error)
  });
  return await msg[Math.floor(Math.random() * msg.length)];
}
