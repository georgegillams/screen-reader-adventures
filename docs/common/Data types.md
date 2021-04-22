# Common data types

## Shared

Every data type has the following properties:

| name                 | type   | source | description |
| -------------------- | ------ | ------ | ----------- |
| id                   | string | stored |             |
| timestamp            | number | stored |             |
| lastUpdatedTimestamp | number | stored |             |

Every data type can also have following properties:

| name        | type   | source     | description                 |
| ----------- | ------ | ---------- | --------------------------- |
| requestedId | string | stored     | the id to take if available |
| authorId    | string | stored     | the id of the creator       |
| deleted     | bool   | stored     |                             |
| ownerUname  | string | calculated |                             |

## Users

db key: `users`

| name             | type    | source | description |
| ---------------- | ------- | ------ | ----------- |
| admin            | boolean | stored |             |
| email            | string  | stored |             |
| emailFingerprint | string  | stored |             |
| name             | string  | stored |             |
| uname            | string  | stored |             |
| password         | string  | stored | unused      |

## Analytics

db key: `analytics`

| name            | type   | source | description |
| --------------- | ------ | ------ | ----------- |
| url             | string | stored |             |
| browser         | string | stored |             |
| browserVersion  | string | stored |             |
| os              | string | stored |             |
| ipAddressPrefix | string | stored |             |

## Emails

db key: `emails`

| name    | type   | source | description |
| ------- | ------ | ------ | ----------- |
| from    | string | stored |             |
| to      | string | stored |             |
| subject | string | stored |             |
| text    | string | stored |             |
| html    | string | stored |             |

## Sessions

db key: `sessions`

| name                       | type   | source | description |
| -------------------------- | ------ | ------ | ----------- |
| sessionKey                 | string | stored |             |
| userId                     | string | stored |             |
| userAuthenticatedTimestamp | number | stored |             |

## Email verification

db key: `emailVerificationCodes`

| name   | type   | source | description |
| ------ | ------ | ------ | ----------- |
| key    | string | stored |             |
| userId | string | stored |             |
| expiry | number | stored |             |

## Magic Link

db key: `magiclinks`

| name   | type   | source | description |
| ------ | ------ | ------ | ----------- |
| key    | string | stored |             |
| userId | string | stored |             |
| expiry | number | stored |             |

## Notifications

db key: `notifications`

| name    | type                     | source | description |
| ------- | ------------------------ | ------ | ----------- |
| type    | 'success'/'warn'/'error' | stored |             |
| message | string                   | stored |             |
