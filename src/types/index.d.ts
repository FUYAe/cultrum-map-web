interface Post {
  title: string,
  info: {
    latitude: string
    longitude: string
  }
  htmlVal: string
}

interface PostLight {
  pid: string
  rate: string
  brief: string
  longitude: number
  latitude: number
  title: string
  name: string
  loc: string
  fee: string
  opentime: string
  imgs: img_light[]
}
interface img_light {
  id: 3,
  size: 0,
  picid: string,
  create_time: string,
  url2: string,
  pid: string,
  update_time: string,
  url1: string,
  name: string
}
interface Scatter {
  name: string,
  value: [number, number],
  pid: string,
  index: string

}