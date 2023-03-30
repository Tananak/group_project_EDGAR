import axios from "axios"
export async function handler(event, context) {
  try {
    const response = await axios.get("https://www.space-track.org/basicspacedata/query/class/decay/DECAY_EPOCH/%3E1988-04-15%2023:59:59/orderby/DECAY_EPOCH%20asc/limit/100/emptyresult/show")
    const data = response.data
    return {
      statusCode: 200,
      body: JSON.stringify({ msg: data.DECAY_EPOCH })
    }
  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    }
  }
}
