import axios from 'axios';
import DataFormatters from './DataFormatter';

export default new class Fowarder {
  constructor() { }
  async toSpaceship(events: any[]) {
    try {
      const eventPromises = []
      const formattedEvents = events.map(e => DataFormatters.forSpaceship(e))

      formattedEvents.map((event) => {
        eventPromises.push(axios.post('https://sweeps.proxy.beeceptor.com/spaceship/r', { event }))
      })
      return await Promise.all(eventPromises)

    } catch (error) {
      // Log to Error Service
      // Retry?
      console.log(error)
    }
  }
  async toMonitor(events: any[]) {
    try {
      const eventPromises = []
      const formattedEvents = events.map(e => DataFormatters.forMonitor(e))

      formattedEvents.map((obj) => {
        const event = obj.event
        eventPromises.push(axios.put(`https://sweeps.proxy.beeceptor.com/m0nit0r.com/track_ship/${obj.timestamp}`, { event }))
      })

      return await Promise.all(eventPromises)
    } catch (error) {
      console.log(error)
    }
  }

  async toSkyAnalytics(events: any[]) {
    try {
      const eventPromises = []
      const formattedEvents = []
      for await (const event of events) {
        const e = await DataFormatters.forSkyAnalytics(event)
        formattedEvents.push(e)
      }

      formattedEvents.map((event) => {
        eventPromises.push(axios.post('https://sweeps.proxy.beeceptor.com/skyanalytics/get', { event }))
      })

      return await Promise.all(eventPromises)
    } catch (error) {
      console.log(error)
    }
  }
}


