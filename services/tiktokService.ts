import { APIResponse } from '../types';

// Enhanced proxy list with fallback strategies
const PROXIES = [
  // Strategy 1: AllOrigins Raw (Often has different IP rotation)
  (target: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(target)}`,
  
  // Strategy 2: AllOrigins JSON (Reliable wrapper)
  (target: string) => `https://api.allorigins.win/get?url=${encodeURIComponent(target)}`,
  
  // Strategy 3: CorsProxy.io (Fast but often rate limited, moved down)
  (target: string) => `https://corsproxy.io/?${encodeURIComponent(target)}`,
  
  // Strategy 4: CodeTabs (Fallback)
  (target: string) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(target)}`,
];

const API_BASE = 'https://tikwm.com/api/';

export const fetchTikTokVideo = async (url: string): Promise<APIResponse> => {
  // Validate URL client-side first
  const regex = /tiktok\.com/;
  if (!regex.test(url)) {
    return { code: -1, msg: 'Invalid TikTok URL. Please paste a valid link.' };
  }

  // Construct the API URL with HD parameter and a timestamp
  // We explicitly ask for hd=1
  const targetUrl = `${API_BASE}?url=${encodeURIComponent(url)}&hd=1&_t=${Date.now()}`;
  
  let lastError: any = null;
  let lastMsg: string = '';

  // Try each proxy until one works
  for (const proxyGen of PROXIES) {
    try {
      const fullUrl = proxyGen(targetUrl);
      console.log(`Trying proxy: ${fullUrl}`); // Debugging

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

      const response = await fetch(fullUrl, {
          signal: controller.signal
      });
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let data: APIResponse;
      const contentType = response.headers.get("content-type");

      // Handle AllOrigins JSON wrapper specifically
      if (fullUrl.includes('api.allorigins.win/get')) {
        const json = await response.json();
        if (!json.contents) throw new Error('No content received from proxy');
        // Sometimes contents is string, sometimes object
        data = typeof json.contents === 'string' ? JSON.parse(json.contents) : json.contents;
      } else {
        // Handle raw JSON responses
        const text = await response.text();
        try {
          data = JSON.parse(text);
        } catch (e) {
          console.warn("Failed to parse JSON:", text.substring(0, 100));
          throw new Error('Invalid JSON response');
        }
      }

      // CRITICAL FIX: Check for the specific "Api Limit" message
      // Even if code is -1, if it's a Limit error, we treat it as a network failure
      // so we can try the NEXT proxy.
      if (data) {
        if (data.msg && (data.msg.includes("Limit") || data.msg.includes("quota"))) {
           console.warn(`Proxy rate limited: ${data.msg}`);
           lastMsg = "Server is busy (Rate Limit). Switching connection...";
           throw new Error("RateLimited"); // Throw to trigger catch and next loop
        }

        // If it's a legitimate success
        if (data.code === 0) {
          return data;
        }
        
        // If it's a specific TikTok error (like "Video not found"), return it immediately
        // don't retry other proxies for valid logic errors.
        if (data.code === -1 && !data.msg.includes("Limit")) {
           return data; 
        }
      }

    } catch (error: any) {
      console.warn(`Proxy attempt failed:`, error.message);
      lastError = error;
      // Continue to next proxy
    }
  }

  // If all proxies fail
  console.error("All proxies failed");
  return { 
    code: -1, 
    msg: lastMsg || 'Server is currently busy due to high traffic. Please try again in a few seconds.' 
  };
};

export const formatNumber = (num: number): string => {
  if (num === undefined || num === null || isNaN(num)) return '0';
  return new Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short" }).format(num);
};