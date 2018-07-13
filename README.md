#pagerduty-oncall-user

Small library to get info about oncall member of your pagerduty schedule. ***No dependecies!***

###Install

```
npm install pagerduty-oncall-user --save
```

###ES6 import

```
import pagerduty from 'pagerduty-oncall-user'
```

###Common js import

```
const pagerduty = require('pagerduty-oncall-user')
```

##Functions

####getOncallUser(scheduler_id, api_key, options)

- #####scheduler_id (string)

    This parameter is ***required***, It represents the ID which you can find in the URL address of the scheduler in PagerDuty.

- #####api_key (string)

    This parameter is ***required***. 
    
- #####options (object)

    This parameter is ***optional***. Object knows three attributes: ***timeZone***, ***since*** and ***until***. These attributes 
    must be used ***together***! You can see your Time Zone right under scheduler's name in PagerDuty. With ***since*** and ***until*** you can 
    specify day and time, in which you want to find out who has oncall. These attributes must be different from each other and have to be in
    ***iso format*** (for example _'2018-07-13T11:19:51.524963'_).

##Example

```
const pagerduty = require('pagerduty-oncall-user')

const scheduler_id = 'O86QD1E'
const api_key = 'jsusDJoq4X9p4e1n9i5s'
const options = {
  timeZone: 'Europe/Prague',
  since: '2018-07-13T11:19:51.524963',
  until: '2018-07-13T11:19:52.524963'
}

try {
  pagerduty.getOncallUser(scheduler_id, api_key, options).then(user => {
    console.log(user)
  })
} catch(e) {
  console.log(e)
}

```

##Result
```
{ 
  contact_methods:
    [ 
      { 
        id: 'O6RTTJF',
        type: 'email_contact_method',
        summary: 'Default',
        self: 'https://api.pagerduty.com/users/P6RTTZ3/contact_methods/P56RTTF',
        html_url: null,
        label: 'Default',  
        address: 'oncall.user@gmail.com',
        send_short_email: false,
        send_html_email: true 
      },
      { 
        id: 'GHT8EXD',
        type: 'phone_contact_method',
        summary: 'Mobile',
        self: 'https://api.pagerduty.com/users/AQQQZ3/contact_methods/KLPOEXD',
        html_url: null,
        label: 'Mobile',
        address: '555123456',
        blacklisted: false,
        country_code: 42
      },
      { 
        id: 'PDHTTTF',
        type: 'push_notification_contact_method',
        summary: 'synphone',
        self: 'https://api.pagerduty.com/users/GOALYZ3/contact_methods/PDPNS6F',
        html_url: null,
        label: 'synphone',
        address: '876c9303b70a5ab1f6a803b6d2ccbe13140745e61f273438cfbb',
        device_type: 'android',
        sounds: [Array],
        blacklisted: false,
        created_at: '2018-01-23T23:44:53+01:00' 
      },
      { 
        id: 'P788RBG',
        type: 'sms_contact_method',
        summary: 'Mobile',
        self: 'https://api.pagerduty.com/users/P77GYZ3/contact_methods/PKMYYZG',
        html_url: null,
        label: 'Mobile',
        address: '555123456',
        blacklisted: false,
        country_code: 42,
        enabled: true 
      } 
    ],
  total: 4 
}
```