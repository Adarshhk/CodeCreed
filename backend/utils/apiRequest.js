import axios from 'axios';

export const submitSolution = async (code , input) => {
    const options = {
      method: 'POST',
      url: 'https://judge0-ce.p.rapidapi.com/submissions',
      params: {
        base64_encoded: 'true',
        wait : 'true',
        fields: '*'
      },
      headers: {
        'content-type': 'application/json',
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': 'ed33078b4dmsh3b9fed247ecf18ap1b6203jsn0be77dd287fa',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      },
      data: {
        language_id: 52,
        source_code: code,
        stdin: input
      }
    };
    
    try {
        const response = await axios.request(options);
        const result = await secondPart(response.data.token);
        
        return result;
        
    } catch (error) {
        console.error(error);
    }
}

const secondPart = async (token) => {
    const options = {
        method: 'GET',
        url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
        params: {
          base64_encoded: 'true',
          fields: '*'
        },
        headers: {
          'X-RapidAPI-Key': 'ed33078b4dmsh3b9fed247ecf18ap1b6203jsn0be77dd287fa',
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          return response.data;
      } catch (error) {
          console.error(error);
      }
}