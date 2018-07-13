const https = require('https')

async function getOncallUser(schedulerID, serviceKey, options = { timeZone: '', since: '', until: ''}) {

  const requestHost = 'api.pagerduty.com'
  const requestHeaders = {
    'Accept': 'application/vnd.pagerduty+json;version=2',
    'Authorization': `Token token=${serviceKey}`
  }
  let requestPath = `/oncalls?schedule_ids%5B%5D=${schedulerID}?time_zone=${options.timeZone}&since=${options.since}&until=${options.until}`

  const userIdResponse = await request(requestHost, requestPath, requestHeaders)
  const userIdResponseJson = JSON.parse(userIdResponse)

  if (!!userIdResponseJson.error) {
    return new Error(userIdResponseJson.error.message)
  } else {
    const userId = JSON.parse(userIdResponse).oncalls[0].user.id
    requestPath = `/users/${userId}/contact_methods`

    const userInfo = await request(requestHost, requestPath, requestHeaders)
    return JSON.parse(userInfo)
  }

}

function request(host, path, headers) {
  return new Promise((resolve, reject) => {
    let body = ''
    const req = https.request({
      method: 'GET',
      host,
      path,
      headers
    }, response => {

      response.on('data', (chunk) => {
        body += chunk
      })

      response.on('end', () => {
        return resolve(body)
      })

    }).on('error', (error) => {
      return reject(`Request error ${error}`)
    })

    req.end()
  })
}

module.exports = { getOncallUser }