const dayjs = require('dayjs')
const defaultActions = [
  'bite nails',
  'walk nervously',
  'tear hair out',
  'punch pillow',
  'swing from side to side',
  'shout',
  'cry',
  'get sucked into your Instagram feed full of other people’s perfect lives',
  'start a nonsense quarrel',
  'eat cookies',
  'eat more cookies',
  'devour all the comfort food in 5km distance',
  'stare at the wall'
]
module.exports = function currentWorry(before, worries, interval = 'minute', actions = defaultActions) {
  const intervalsLeft = dayjs(before).diff(dayjs(), interval)
  if (intervalsLeft < 0) {
    return
  }
  const action = actions[intervalsLeft % actions.length]
  const worry = worries[intervalsLeft % worries.length]
  return {
    action,
    worry
  }
}