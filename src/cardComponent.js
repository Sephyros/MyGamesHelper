export default class cardComponent {
  constructor() {}

  static init() {
    // Mover para um arquivo json separado
    const json = `{
  "precisoDeUmNome": [
      {
          "title": "Calories Intake",
          "dbName": "_calories",
          "description": "O valor apresentado é exatamente igual ao do banco de dados.",
          "lastRead": "2538.6394"
      },
      {
          "title": "Water Intake",
          "dbName": "_waterIntake",
          "description": "O valor apresentado é 1000 vezes maior e arredondado para primeira casa decimal.",
          "lastRead": "5.0273771"
      }
  ]
}`;

    const infoObjects = JSON.parse(json).precisoDeUmNome;

    // Somente para popular mais rapido...remover depois
    // REMOVEME BEGIN
    const offset = infoObjects.length;
    for (let i = 0; i < 100; i++) {
      const itemNumber = i + 1 + offset;
      infoObjects.push({
        title: `Título nº ${itemNumber}`,
        dbName: "_calories" + itemNumber,
        description: `Descrição do item nº ${itemNumber}`,
        lastRead: itemNumber,
      });
    }
    // REMOVEME END

    const main = document.querySelector("main").firstElementChild;

    infoObjects.forEach(({ title, dbName, description, lastRead }, index) => {
      const date = Date.now() - 20 * 1000;

      const divCol = document.createElement("div");
      divCol.setAttribute("id", `${dbName}Card`);
      divCol.classList.add("col");

      const card = document.createElement("div");
      card.classList.add("card");
      card.classList.add("h-100");
      card.classList.add("bg-dark");
      card.classList.add("border-primary");
      card.classList.add("alpha-50");
      divCol.appendChild(card);

      const image = document.createElement("img");
      image.setAttribute("src", `../src/images/${dbName}.png`);

      // Somente para popular mais rapido...remover depois
      // REMOVEME BEGIN
      if (index >= offset) {
        image.setAttribute("src", `../src/images/imagePlaceholder.jpg`);
      }
      // REMOVEME END

      image.classList.add("card-img-top");
      image.classList.add("img-responsive");
      image.classList.add("alpha-50");
      card.appendChild(image);

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");
      card.appendChild(cardBody);

      const cardTitle = document.createElement("h5");
      cardTitle.classList.add("card-title");
      cardTitle.innerText = `${title}`;
      cardBody.appendChild(cardTitle);

      const cardSubTitle = document.createElement("h6");
      cardSubTitle.classList.add("card-subtitle");
      cardSubTitle.classList.add("mb-2");
      cardSubTitle.classList.add("text-muted");
      cardSubTitle.innerText = `${dbName}`;
      cardBody.appendChild(cardSubTitle);

      const cardText = document.createElement("p");
      cardText.classList.add("card-text");
      cardText.innerText = `${description}\nLeitura: ${lastRead}`;
      cardBody.appendChild(cardText);

      const cardFooter = document.createElement("div");
      cardFooter.classList.add("card-footer");
      cardFooter.classList.add("border-primary");
      card.appendChild(cardFooter);

      const cardFooterText = document.createElement("small");
      cardFooterText.classList.add("text-muted");
      cardFooterText.innerText = fromNow(Date.now());

      cardFooter.appendChild(cardFooterText);

      main.appendChild(divCol);
    });

    /**
     * Human readable elapsed or remaining time (example: 3 minutes ago)
     * @param  {Date|Number|String} date A Date object, timestamp or string parsable with Date.parse()
     * @param  {Date|Number|String} [nowDate] A Date object, timestamp or string parsable with Date.parse()
     * @param  {Intl.RelativeTimeFormat} [trf] A Intl formater
     * @return {string} Human readable elapsed or remaining time
     * @author github.com/victornpb
     * @see https://stackoverflow.com/a/67338038/938822
     */
    function fromNow(
      date,
      nowDate = Date.now(),
      rft = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" })
    ) {
      const SECOND = 1000;
      const MINUTE = 60 * SECOND;
      const HOUR = 60 * MINUTE;
      const DAY = 24 * HOUR;
      const WEEK = 7 * DAY;
      const MONTH = 30 * DAY;
      const YEAR = 365 * DAY;
      const intervals = [
        { ge: YEAR, divisor: YEAR, unit: "year" },
        { ge: MONTH, divisor: MONTH, unit: "month" },
        { ge: WEEK, divisor: WEEK, unit: "week" },
        { ge: DAY, divisor: DAY, unit: "day" },
        { ge: HOUR, divisor: HOUR, unit: "hour" },
        { ge: MINUTE, divisor: MINUTE, unit: "minute" },
        { ge: 30 * SECOND, divisor: SECOND, unit: "seconds" },
        { ge: 0, divisor: 1, text: "agora" },
      ];
      const now =
        typeof nowDate === "object"
          ? nowDate.getTime()
          : new Date(nowDate).getTime();
      const diff =
        now - (typeof date === "object" ? date : new Date(date)).getTime();
      const diffAbs = Math.abs(diff);
      for (const interval of intervals) {
        if (diffAbs >= interval.ge) {
          const x = Math.round(Math.abs(diff) / interval.divisor);
          const isFuture = diff < 0;
          return interval.unit
            ? rft.format(isFuture ? x : -x, interval.unit)
            : interval.text;
        }
      }
    }
  }
}
