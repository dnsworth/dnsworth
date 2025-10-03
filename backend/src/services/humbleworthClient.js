import axios from 'axios';

class HumbleworthClient {
  constructor() {
    this.baseURL = process.env.HUMBLEWORTH_API_BASE || 'https://api.humbleworth.com';
    this.apiKey = process.env.HUMBLEWORTH_API_KEY || process.env.HUMBLE_WORTH_API_KEY || process.env.HUMBLE_API_KEY;
    this.timeoutMs = 10000;
  }

  async getValue(domain) {
    if (!this.apiKey) {
      throw new Error('HumbleWorth API key not configured');
    }
    const url = `${this.baseURL}/value`;
    const params = { domain };
    const headers = {
      'Authorization': `Bearer ${this.apiKey}`,
      'Accept': 'application/json'
    };
    const resp = await axios.get(url, { params, headers, timeout: this.timeoutMs });
    // Normalize a few possible shapes
    const data = resp.data?.data || resp.data || {};
    return {
      value_usd: data.estimated_value_usd ?? data.estimated_value ?? data.value_usd ?? data.value,
      confidence: data.confidence ?? data.score ?? 70,
      raw: data
    };
  }
}

export default HumbleworthClient;


