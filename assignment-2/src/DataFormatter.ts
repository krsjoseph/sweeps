import Axios from "axios"

export default new class DataFormatter {
  constructor() { }

  forSpaceship(event) {
    let toReturn = {}
    let flatObject
    for (let i in event) {
      // console.log(i + ' ' + typeof (event[i]))
      if (!event.hasOwnProperty(i)) {
        continue
      }
      //Exclude arrays from the final result
      //Check this http://stackoverflow.com/questions/4775722/check-if-object-is-array
      if (event[i] && Array === event[i].constructor) {
        console.log(event[i].toString())
        console.log(i)

        toReturn[i] = event[i].toString()

        continue
      }
      if ((typeof event[i]) === 'object') {
        flatObject = this.forSpaceship(event[i])
        for (let x in flatObject) {
          if (!flatObject.hasOwnProperty(x)) {
            continue
          }
          //Exclude arrays from the final result
          if (flatObject[x] && Array === flatObject.constructor) {
            // toReturn["i + (!!isNaN(x) ? '.' + x : '')"] = x
            continue
          }
          toReturn[i + (!!isNaN(x) ? '.' + x : '')] = flatObject[x]
        }
      } else {
        toReturn[i] = event[i]
      }
    }
    return toReturn
  }

  forMonitor(event) {
    const timestamp = Math.floor(event.timestamp / 1000)
    const formattedEvent = { [timestamp]: {} }

    for (const [key, value] of Object.entries(event)) {
      if (key !== "timestamp") {
        formattedEvent[key] = value
      }
    }

    return { event: formattedEvent, timestamp: timestamp }
  }

  async forSkyAnalytics(event) {
    const formattedEvent = {}
    for (const [key, value] of Object.entries(event)) {
      if (key !== "t") {
        formattedEvent[key.toUpperCase()] = value
      } else {
        formattedEvent[key] = value
      }
    }

    const coordRes = await Axios.get(`https://api.mapcode.com/mapcode/codes/${formattedEvent['LAT-LON'][0]},${formattedEvent['LAT-LON'][1]}`)
    const coords = coordRes.data
    formattedEvent['LAT-LON'] = coords.international.mapcode;

    return formattedEvent;
  }

}

