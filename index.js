const https = require('https')

async function getOncallUser(schedulerID, serviceKey, options = {
  timeZone: 'Europe/Prague'
}) {
  try {
    const requestHost = 'api.pagerduty.com'
    const requestHeaders = {
      'Accept': 'application/vnd.pagerduty+json;version=2',
      'Authorization': `Token token=${serviceKey}`
    }
    let requestPath = `/oncalls?time_zone=${options.timeZone}&schedule_ids%5B%5D=${schedulerID}`

    const userIdResponse = await request(requestHost, requestPath, requestHeaders)
    const userId = JSON.parse(userIdResponse).oncalls[0].user.id

    requestPath = `https://api.pagerduty.com/users/${userId}/contact_methods`
    const userInfoResponse = await request(requestHost, requestPath, requestHeaders)
    const userInfo = JSON.parse(userInfoResponse)

    return userInfo
  } catch (error) {
    console.error(error)
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