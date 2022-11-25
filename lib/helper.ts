import axios from 'axios'
import cheerio from 'cheerio'

type arr = any[]

export const fetcher = async (url, fn) => {
    const response = await axios.get(url)
    const data = await response.data
    const arr: arr = []
    const $ = cheerio.load(data)
    $('#main > article').each((i, el) => {
        const title = $(el).find("div > a").attr('title')
        const episode = $(el).find("div > .postedon").text()
        const image = $(el).find("div > a > img").attr('src')
        const obj = {
            title,
            image,
            link: `/anime/${title.replace(/[\s:]+/g, "-") + '-' + episode.replace(/,?[ ]/g, '-')}`,
            anime: title.replace(/[\s:]+/g, "-"),
        episode,
        }
        arr.push(obj)
    })
    return fn(arr)
}