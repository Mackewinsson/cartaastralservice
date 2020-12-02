const axios = require("axios");
const FormData = require("form-data");
const cheerio = require("cheerio");

(async () => {
  try {
    const data = new FormData();
    data.append("fecha", "5-4-1989");
    data.append("hora", "00%3A00%3A00");
    data.append("tiempo", "ST");
    data.append("Pais", "VE");
    data.append("n1", "23");
    data.append("select-ciudad", "Maracaibo");
    data.append("ID_Sitio", "3633009");

    const config = {
      method: "post",
      url: "https://carta-natal.es/carta.php?",
      headers: {
        Cookie: "PHPSESSID=pvvsao7n83amhcm90f0rtglj56",
        ...data.getHeaders(),
      },
      data: data,
    };

    const response = await axios(config);
    const parsedData = JSON.stringify(response.data);
    const $ = cheerio.load(parsedData);
    const signoSolar = $('div[class="rueda"]')
      .text()
      .match(/[s,S]igno [s,S]olar: [A-Z][a-z,á,é,í,ó,ú]+/g)[0];
    const signoLunar = $('div[class="rueda"]')
      .text()
      .match(/[s,S]igno [l,L]unar: [A-Z][a-z,á,é,í,ó,ú]+/g)[0];
    const ascendente = $('div[class="rueda"]')
      .text()
      .match(/[a,A]scendente: [A-Z][a-z,á,é,í,ó,ú]+/g)[0];
    const image = $('div[class="rueda"] > a').attr("href");
    console.log(signoSolar);
    console.log(signoLunar);
    console.log(ascendente);
    console.log(image);
  } catch (error) {
    console.log(error);
  }
})();
