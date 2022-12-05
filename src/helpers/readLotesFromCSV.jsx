import Papa from 'papaparse'

export const readLotesFromCSV = async (file) => {
  return await new Promise((resolve, reject) => {
    let lotesData = []
    const reader = new FileReader()

    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target?.result)
      const parsedData = csv?.data?.slice(6)

      for (const element of parsedData) {
        if (element.length === 3 && Math.abs(Number(element[2])) < 50 && element[0].length < 24) {
          lotesData.push({
            tag: element[0],
            count: Number(element[1]),
            rssi: Number(element[2])
          })
        }
      }
      resolve(lotesData)
    }

    reader.readAsText(file)
  })
}