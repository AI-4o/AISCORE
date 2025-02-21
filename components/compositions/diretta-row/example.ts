const exampleStatisticsA = [
  {
    type: "Shots on Goal",
    value: 3,
  },
  {
    type: "Shots off Goal",
    value: 2,
  },
  {
    type: "Total Shots",
    value: 9,
  },
  {
    type: "Blocked Shots",
    value: 4,
  },
  {
    type: "Shots insidebox",
    value: 4,
  },
  {
    type: "Shots outsidebox",
    value: 5,
  },
  {
    type: "Fouls",
    value: 22,
  },
  {
    type: "Corner Kicks",
    value: 3,
  },
  {
    type: "Offsides",
    value: 1,
  },
  {
    type: "Ball Possession",
    value: "32%",
  },
  {
    type: "Yellow Cards",
    value: 5,
  },
  {
    type: "Red Cards",
    value: 1,
  },
  {
    type: "Goalkeeper Saves",
    value: null,
  },
  {
    type: "Total passes",
    value: 242,
  },
  {
    type: "Passes accurate",
    value: 121,
  },
  {
    type: "Passes %",
    value: null,
  },
];

export const getExampleStatistics = () => {
    return exampleStatisticsA.map((stat) => ({
        ...stat,
        value: Math.floor(Math.random() * 10),
    }));
}